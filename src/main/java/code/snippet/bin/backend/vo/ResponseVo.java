package code.snippet.bin.backend.vo;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResponseVo {
    private Boolean verdict;
    private String message;
}
