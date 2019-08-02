package code.snippet.bin.backend.service;

import code.snippet.bin.backend.entity.CodeSnippet;
import code.snippet.bin.backend.repository.CodeSnippetRepository;
import code.snippet.bin.backend.vo.ResponseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class CodeSnippetService {

    @Autowired
    private CodeSnippetRepository codeSnippetRepository;
    
    private static final String EMPTY_CODE = "code is empty";
    private static final String SUCCESS = "success";

    private static final String WRONG_ID = "wrong snippet id";
    
    public ResponseVo createSnippet(CodeSnippet snippet) {
        if ("".equals(snippet.getCode()) || snippet.getCode() == null) {
            return ResponseVo.builder().verdict(false).message(EMPTY_CODE).build();
        }
        snippet.setId(-1L);
        snippet.setIsDeleted(false);
        snippet.setTitle(snippet.getCode().split("\n")[0]);
        snippet.setModifiedTime(new Timestamp(new Date().getTime()));
        ResponseVo responseVo = new ResponseVo();
        try {
            codeSnippetRepository.save(snippet);
            responseVo.setVerdict(true);
            responseVo.setMessage(SUCCESS);
        } catch(Exception e) {
            responseVo.setVerdict(false);
            responseVo.setMessage(e.getMessage());
        }
        
        return responseVo;
    }

    public List<CodeSnippet> fetchAllSnippets() {
        try {
            return codeSnippetRepository.findAllByIsDeletedOrderByIdDesc(false);
        } catch (Exception e) {
            return null;
        }

    }

    public ResponseVo deleteSnippet(Long id) {
        if (id < 0 || codeSnippetRepository.findById(id) == null) {
            return ResponseVo.builder().verdict(false).message(WRONG_ID).build();
        }
        ResponseVo responseVo = new ResponseVo();
        try {
            CodeSnippet snippet = codeSnippetRepository.findById(id).get();
            snippet.setIsDeleted(true);
            codeSnippetRepository.save(snippet);
            responseVo.setVerdict(true);
            responseVo.setMessage(SUCCESS);
        } catch(Exception e) {
            responseVo.setVerdict(false);
            responseVo.setMessage(e.getMessage());
        }
        
        return responseVo;

    }
}
