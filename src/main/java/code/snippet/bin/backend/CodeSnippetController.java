package code.snippet.bin.backend;

import code.snippet.bin.backend.entity.CodeSnippet;
import code.snippet.bin.backend.service.CodeSnippetService;
import code.snippet.bin.backend.vo.ResponseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/codeSnippet")
public class CodeSnippetController {

    @Autowired
    private CodeSnippetService codeSnippetService;
    
    
    @PostMapping(value = "/")
    public ResponseVo createSnippet(@RequestBody CodeSnippet snippet) {
        return codeSnippetService.createSnippet(snippet);
    }

    @GetMapping(value = "/listAll")
    public List<CodeSnippet> fetchAllSnippets() {
        return codeSnippetService.fetchAllSnippets();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseVo deleteSnippet(@PathVariable Long id) {
        return codeSnippetService.deleteSnippet(id);
    }
}
