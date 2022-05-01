package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendSideDTO {
    private Long sideSq;

    private String sideName;

    private List<SendSideCategoryDTO> sideCategoryDTOList = new ArrayList<>();
}
