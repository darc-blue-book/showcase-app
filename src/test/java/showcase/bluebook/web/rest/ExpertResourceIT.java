package showcase.bluebook.web.rest;

import showcase.bluebook.BluebookApp;
import showcase.bluebook.domain.Expert;
import showcase.bluebook.repository.ExpertRepository;
import showcase.bluebook.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static showcase.bluebook.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExpertResource} REST controller.
 */
@SpringBootTest(classes = BluebookApp.class)
public class ExpertResourceIT {

    private static final String DEFAULT_EXPERTISE = "AAAAAAAAAA";
    private static final String UPDATED_EXPERTISE = "BBBBBBBBBB";

    @Autowired
    private ExpertRepository expertRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restExpertMockMvc;

    private Expert expert;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpertResource expertResource = new ExpertResource(expertRepository);
        this.restExpertMockMvc = MockMvcBuilders.standaloneSetup(expertResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expert createEntity() {
        Expert expert = new Expert()
            .expertise(DEFAULT_EXPERTISE);
        return expert;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expert createUpdatedEntity() {
        Expert expert = new Expert()
            .expertise(UPDATED_EXPERTISE);
        return expert;
    }

    @BeforeEach
    public void initTest() {
        expertRepository.deleteAll();
        expert = createEntity();
    }

    @Test
    public void createExpert() throws Exception {
        int databaseSizeBeforeCreate = expertRepository.findAll().size();

        // Create the Expert
        restExpertMockMvc.perform(post("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isCreated());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeCreate + 1);
        Expert testExpert = expertList.get(expertList.size() - 1);
        assertThat(testExpert.getExpertise()).isEqualTo(DEFAULT_EXPERTISE);
    }

    @Test
    public void createExpertWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expertRepository.findAll().size();

        // Create the Expert with an existing ID
        expert.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpertMockMvc.perform(post("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isBadRequest());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllExperts() throws Exception {
        // Initialize the database
        expertRepository.save(expert);

        // Get all the expertList
        restExpertMockMvc.perform(get("/api/experts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expert.getId())))
            .andExpect(jsonPath("$.[*].expertise").value(hasItem(DEFAULT_EXPERTISE.toString())));
    }
    
    @Test
    public void getExpert() throws Exception {
        // Initialize the database
        expertRepository.save(expert);

        // Get the expert
        restExpertMockMvc.perform(get("/api/experts/{id}", expert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expert.getId()))
            .andExpect(jsonPath("$.expertise").value(DEFAULT_EXPERTISE.toString()));
    }

    @Test
    public void getNonExistingExpert() throws Exception {
        // Get the expert
        restExpertMockMvc.perform(get("/api/experts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateExpert() throws Exception {
        // Initialize the database
        expertRepository.save(expert);

        int databaseSizeBeforeUpdate = expertRepository.findAll().size();

        // Update the expert
        Expert updatedExpert = expertRepository.findById(expert.getId()).get();
        updatedExpert
            .expertise(UPDATED_EXPERTISE);

        restExpertMockMvc.perform(put("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpert)))
            .andExpect(status().isOk());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeUpdate);
        Expert testExpert = expertList.get(expertList.size() - 1);
        assertThat(testExpert.getExpertise()).isEqualTo(UPDATED_EXPERTISE);
    }

    @Test
    public void updateNonExistingExpert() throws Exception {
        int databaseSizeBeforeUpdate = expertRepository.findAll().size();

        // Create the Expert

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpertMockMvc.perform(put("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isBadRequest());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteExpert() throws Exception {
        // Initialize the database
        expertRepository.save(expert);

        int databaseSizeBeforeDelete = expertRepository.findAll().size();

        // Delete the expert
        restExpertMockMvc.perform(delete("/api/experts/{id}", expert.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expert.class);
        Expert expert1 = new Expert();
        expert1.setId("id1");
        Expert expert2 = new Expert();
        expert2.setId(expert1.getId());
        assertThat(expert1).isEqualTo(expert2);
        expert2.setId("id2");
        assertThat(expert1).isNotEqualTo(expert2);
        expert1.setId(null);
        assertThat(expert1).isNotEqualTo(expert2);
    }
}
