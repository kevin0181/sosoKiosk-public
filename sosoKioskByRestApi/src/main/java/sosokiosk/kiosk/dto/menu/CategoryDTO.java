package sosokiosk.kiosk.dto.menu;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long categorySq;

    private String categoryName;

    private int categoryIndex;

    private List<MenuDTO> menuDTOList = new ArrayList<>();
}
