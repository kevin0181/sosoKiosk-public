package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendCategoryDTO {
    private Long categorySq;

    private String categoryName;

    private List<SendMenuDTO> menuDTOList = new ArrayList<>();
}
