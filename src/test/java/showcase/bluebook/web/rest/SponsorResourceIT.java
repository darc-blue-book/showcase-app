package showcase.bluebook.web.rest;

import showcase.bluebook.BluebookApp;
import showcase.bluebook.domain.Sponsor;
import showcase.bluebook.repository.SponsorRepository;
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

import showcase.bluebook.domain.enumeration.Currency;
/**
 * Integration tests for the {@link SponsorResource} REST controller.
 */
@SpringBootTest(classes = BluebookApp.class)
public class SponsorResourceIT {

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;
    private static final Double SMALLER_AMOUNT = 1D - 1D;

    private static final Currency DEFAULT_CURRENCY = Currency.USD;
    private static final Currency UPDATED_CURRENCY = Currency.AUD;

    @Autowired
    private SponsorRepository sponsorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSponsorMockMvc;

    private Sponsor sponsor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SponsorResource sponsorResource = new SponsorResource(sponsorRepository);
        this.restSponsorMockMvc = MockMvcBuilders.standaloneSetup(sponsorResource)
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
    public static Sponsor createEntity() {
        Sponsor sponsor = new Sponsor()
            .iban(DEFAULT_IBAN)
            .amount(DEFAULT_AMOUNT)
            .currency(DEFAULT_CURRENCY);
        return sponsor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sponsor createUpdatedEntity() {
        Sponsor sponsor = new Sponsor()
            .iban(UPDATED_IBAN)
            .amount(UPDATED_AMOUNT)
            .currency(UPDATED_CURRENCY);
        return sponsor;
    }

    @BeforeEach
    public void initTest() {
        sponsorRepository.deleteAll();
        sponsor = createEntity();
    }

    @Test
    public void createSponsor() throws Exception {
        int databaseSizeBeforeCreate = sponsorRepository.findAll().size();

        // Create the Sponsor
        restSponsorMockMvc.perform(post("/api/sponsors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsor)))
            .andExpect(status().isCreated());

        // Validate the Sponsor in the database
        List<Sponsor> sponsorList = sponsorRepository.findAll();
        assertThat(sponsorList).hasSize(databaseSizeBeforeCreate + 1);
        Sponsor testSponsor = sponsorList.get(sponsorList.size() - 1);
        assertThat(testSponsor.getIban()).isEqualTo(DEFAULT_IBAN);
        assertThat(testSponsor.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSponsor.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    public void createSponsorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sponsorRepository.findAll().size();

        // Create the Sponsor with an existing ID
        sponsor.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSponsorMockMvc.perform(post("/api/sponsors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsor)))
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        List<Sponsor> sponsorList = sponsorRepository.findAll();
        assertThat(sponsorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllSponsors() throws Exception {
        // Initialize the database
        sponsorRepository.save(sponsor);

        // Get all the sponsorList
        restSponsorMockMvc.perform(get("/api/sponsors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sponsor.getId())))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())));
    }
    
    @Test
    public void getSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.save(sponsor);

        // Get the sponsor
        restSponsorMockMvc.perform(get("/api/sponsors/{id}", sponsor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sponsor.getId()))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()));
    }

    @Test
    public void getNonExistingSponsor() throws Exception {
        // Get the sponsor
        restSponsorMockMvc.perform(get("/api/sponsors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.save(sponsor);

        int databaseSizeBeforeUpdate = sponsorRepository.findAll().size();

        // Update the sponsor
        Sponsor updatedSponsor = sponsorRepository.findById(sponsor.getId()).get();
        updatedSponsor
            .iban(UPDATED_IBAN)
            .amount(UPDATED_AMOUNT)
            .currency(UPDATED_CURRENCY);

        restSponsorMockMvc.perform(put("/api/sponsors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSponsor)))
            .andExpect(status().isOk());

        // Validate the Sponsor in the database
        List<Sponsor> sponsorList = sponsorRepository.findAll();
        assertThat(sponsorList).hasSize(databaseSizeBeforeUpdate);
        Sponsor testSponsor = sponsorList.get(sponsorList.size() - 1);
        assertThat(testSponsor.getIban()).isEqualTo(UPDATED_IBAN);
        assertThat(testSponsor.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSponsor.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    public void updateNonExistingSponsor() throws Exception {
        int databaseSizeBeforeUpdate = sponsorRepository.findAll().size();

        // Create the Sponsor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSponsorMockMvc.perform(put("/api/sponsors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsor)))
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        List<Sponsor> sponsorList = sponsorRepository.findAll();
        assertThat(sponsorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.save(sponsor);

        int databaseSizeBeforeDelete = sponsorRepository.findAll().size();

        // Delete the sponsor
        restSponsorMockMvc.perform(delete("/api/sponsors/{id}", sponsor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sponsor> sponsorList = sponsorRepository.findAll();
        assertThat(sponsorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sponsor.class);
        Sponsor sponsor1 = new Sponsor();
        sponsor1.setId("id1");
        Sponsor sponsor2 = new Sponsor();
        sponsor2.setId(sponsor1.getId());
        assertThat(sponsor1).isEqualTo(sponsor2);
        sponsor2.setId("id2");
        assertThat(sponsor1).isNotEqualTo(sponsor2);
        sponsor1.setId(null);
        assertThat(sponsor1).isNotEqualTo(sponsor2);
    }
}
