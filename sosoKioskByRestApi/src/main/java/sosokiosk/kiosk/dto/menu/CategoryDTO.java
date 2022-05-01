package sosokiosk.kiosk.dto.menu;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long categorySq;

    private String categoryName;

    private List<MenuDTO> menuDTOList = new ArrayList<>();
}
