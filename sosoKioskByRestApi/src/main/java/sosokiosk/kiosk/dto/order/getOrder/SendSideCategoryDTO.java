package sosokiosk.kiosk.dto.order.getOrder;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendSideCategoryDTO {

    private Long sideCategorySq;

    private Long sideSq;

    private String sideCategoryName;

    private List<SendMenuSideDTO> menuSideDTOList = new ArrayList<>();

}
