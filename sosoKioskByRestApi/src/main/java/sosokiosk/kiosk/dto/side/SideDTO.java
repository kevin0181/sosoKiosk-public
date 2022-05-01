package sosokiosk.kiosk.dto.side;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SideDTO {
    private Long sideSq;

    private String sideName;

    private List<SideCategoryDTO> sideCategoryDTOList = new ArrayList<>();
}
