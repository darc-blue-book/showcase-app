package showcase.bluebook.web.rest;

import showcase.bluebook.domain.Expert;
import showcase.bluebook.repository.ExpertRepository;
import showcase.bluebook.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link showcase.bluebook.domain.Expert}.
 */
@RestController
@RequestMapping("/api")
public class ExpertResource {

    private final Logger log = LoggerFactory.getLogger(ExpertResource.class);

    private static final String ENTITY_NAME = "expert";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpertRepository expertRepository;

    public ExpertResource(ExpertRepository expertRepository) {
        this.expertRepository = expertRepository;
    }

    /**
     * {@code POST  /experts} : Create a new expert.
     *
     * @param expert the expert to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expert, or with status {@code 400 (Bad Request)} if the expert has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/experts")
    public ResponseEntity<Expert> createExpert(@RequestBody Expert expert) throws URISyntaxException {
        log.debug("REST request to save Expert : {}", expert);
        if (expert.getId() != null) {
            throw new BadRequestAlertException("A new expert cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expert result = expertRepository.save(expert);
        return ResponseEntity.created(new URI("/api/experts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /experts} : Updates an existing expert.
     *
     * @param expert the expert to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expert,
     * or with status {@code 400 (Bad Request)} if the expert is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expert couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/experts")
    public ResponseEntity<Expert> updateExpert(@RequestBody Expert expert) throws URISyntaxException {
        log.debug("REST request to update Expert : {}", expert);
        if (expert.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expert result = expertRepository.save(expert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, expert.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /experts} : get all the experts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of experts in body.
     */
    @GetMapping("/experts")
    public List<Expert> getAllExperts() {
        log.debug("REST request to get all Experts");
        return expertRepository.findAll();
    }

    /**
     * {@code GET  /experts/:id} : get the "id" expert.
     *
     * @param id the id of the expert to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expert, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/experts/{id}")
    public ResponseEntity<Expert> getExpert(@PathVariable String id) {
        log.debug("REST request to get Expert : {}", id);
        Optional<Expert> expert = expertRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expert);
    }

    /**
     * {@code DELETE  /experts/:id} : delete the "id" expert.
     *
     * @param id the id of the expert to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/experts/{id}")
    public ResponseEntity<Void> deleteExpert(@PathVariable String id) {
        log.debug("REST request to delete Expert : {}", id);
        expertRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
