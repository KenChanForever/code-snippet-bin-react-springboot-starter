package code.snippet.bin.backend.repository;

import code.snippet.bin.backend.entity.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {
    List<CodeSnippet> findAllByIsDeletedOrderByIdDesc(Boolean isDeleted);
}