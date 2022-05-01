package sosokiosk.kiosk.entity.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categorySq;

    @Column(name = "category_name") //200
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_sq")
    @JsonIgnore
    private List<MenuEntity> menuDTOList = new ArrayList<>();
}
