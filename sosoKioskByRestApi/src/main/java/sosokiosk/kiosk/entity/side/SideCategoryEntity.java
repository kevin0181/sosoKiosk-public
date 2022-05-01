package sosokiosk.kiosk.entity.side;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "side_category")
public class SideCategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "side_category_sq")
    private Long sideCategorySq;

    @Column(name = "side_sq")
    private Long sideSq;

    @Column(name = "side_category_name") //200
    private String sideCategoryName;

    @ManyToOne
    @JoinColumn(name = "side_sq", insertable = false, updatable = false)
    private SideEntity sideDTO;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "side_category_sq")
    private List<MenuSideEntity> menuSideDTOList = new ArrayList<>();

}
