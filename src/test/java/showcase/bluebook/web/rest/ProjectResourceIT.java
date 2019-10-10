package showcase.bluebook.web.rest;

import showcase.bluebook.BluebookApp;
import showcase.bluebook.domain.Project;
import showcase.bluebook.repository.ProjectRepository;
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


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static showcase.bluebook.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProjectResource} REST controller.
 */
@SpringBootTest(classes = BluebookApp.class)
public class ProjectResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_START = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_END = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_END = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_FUNDS = 1D;
    private static final Double UPDATED_FUNDS = 2D;
    private static final Double SMALLER_FUNDS = 1D - 1D;

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Long DEFAULT_VOLUNTEER_NUMBER = 1L;
    private static final Long UPDATED_VOLUNTEER_NUMBER = 2L;
    private static final Long SMALLER_VOLUNTEER_NUMBER = 1L - 1L;

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final Long DEFAULT_SCORE = 1L;
    private static final Long UPDATED_SCORE = 2L;
    private static final Long SMALLER_SCORE = 1L - 1L;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProjectMockMvc;

    private Project project;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectResource projectResource = new ProjectResource(projectRepository);
        this.restProjectMockMvc = MockMvcBuilders.standaloneSetup(projectResource)
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
    public static Project createEntity() {
        Project project = new Project()
            .title(DEFAULT_TITLE)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .description(DEFAULT_DESCRIPTION)
            .funds(DEFAULT_FUNDS)
            .image(DEFAULT_IMAGE)
            .volunteerNumber(DEFAULT_VOLUNTEER_NUMBER)
            .videoUrl(DEFAULT_VIDEO_URL)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .score(DEFAULT_SCORE);
        return project;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Project createUpdatedEntity() {
        Project project = new Project()
            .title(UPDATED_TITLE)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .description(UPDATED_DESCRIPTION)
            .funds(UPDATED_FUNDS)
            .image(UPDATED_IMAGE)
            .volunteerNumber(UPDATED_VOLUNTEER_NUMBER)
            .videoUrl(UPDATED_VIDEO_URL)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .score(UPDATED_SCORE);
        return project;
    }

    @BeforeEach
    public void initTest() {
        projectRepository.deleteAll();
        project = createEntity();
    }

    @Test
    public void createProject() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate + 1);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProject.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testProject.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testProject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProject.getFunds()).isEqualTo(DEFAULT_FUNDS);
        assertThat(testProject.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProject.getVolunteerNumber()).isEqualTo(DEFAULT_VOLUNTEER_NUMBER);
        assertThat(testProject.getVideoUrl()).isEqualTo(DEFAULT_VIDEO_URL);
        assertThat(testProject.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testProject.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testProject.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    public void createProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project with an existing ID
        project.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProjects() throws Exception {
        // Initialize the database
        projectRepository.save(project);

        // Get all the projectList
        restProjectMockMvc.perform(get("/api/projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(project.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].funds").value(hasItem(DEFAULT_FUNDS.doubleValue())))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].volunteerNumber").value(hasItem(DEFAULT_VOLUNTEER_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].videoUrl").value(hasItem(DEFAULT_VIDEO_URL.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.intValue())));
    }
    
    @Test
    public void getProject() throws Exception {
        // Initialize the database
        projectRepository.save(project);

        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", project.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(project.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.funds").value(DEFAULT_FUNDS.doubleValue()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()))
            .andExpect(jsonPath("$.volunteerNumber").value(DEFAULT_VOLUNTEER_NUMBER.intValue()))
            .andExpect(jsonPath("$.videoUrl").value(DEFAULT_VIDEO_URL.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.intValue()));
    }

    @Test
    public void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProject() throws Exception {
        // Initialize the database
        projectRepository.save(project);

        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Update the project
        Project updatedProject = projectRepository.findById(project.getId()).get();
        updatedProject
            .title(UPDATED_TITLE)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .description(UPDATED_DESCRIPTION)
            .funds(UPDATED_FUNDS)
            .image(UPDATED_IMAGE)
            .volunteerNumber(UPDATED_VOLUNTEER_NUMBER)
            .videoUrl(UPDATED_VIDEO_URL)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .score(UPDATED_SCORE);

        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProject)))
            .andExpect(status().isOk());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProject.getStart()).isEqualTo(UPDATED_START);
        assertThat(testProject.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testProject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProject.getFunds()).isEqualTo(UPDATED_FUNDS);
        assertThat(testProject.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProject.getVolunteerNumber()).isEqualTo(UPDATED_VOLUNTEER_NUMBER);
        assertThat(testProject.getVideoUrl()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testProject.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testProject.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testProject.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    public void updateNonExistingProject() throws Exception {
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Create the Project

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProject() throws Exception {
        // Initialize the database
        projectRepository.save(project);

        int databaseSizeBeforeDelete = projectRepository.findAll().size();

        // Delete the project
        restProjectMockMvc.perform(delete("/api/projects/{id}", project.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = new Project();
        project1.setId("id1");
        Project project2 = new Project();
        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);
        project2.setId("id2");
        assertThat(project1).isNotEqualTo(project2);
        project1.setId(null);
        assertThat(project1).isNotEqualTo(project2);
    }
}
