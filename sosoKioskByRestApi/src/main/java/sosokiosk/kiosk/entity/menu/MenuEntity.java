package sosokiosk.kiosk.entity.menu;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.entity.side.SideEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity(name = "menu")
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuSq;

    @Column(name = "category_sq")
    private Long categorySq;

    @Column(name = "menu_name") //200
    private String menuName;

    @Column(name = "menu_price") //50
    private String menuPrice;

    @Column(name = "menu_sold_out")
    private boolean menuSoldOut;

    @Column(name = "menu_enable")
    private boolean menuEnable;

    @ManyToOne
    @JoinColumn(name = "category_sq", insertable = false, updatable = false)
    private CategoryEntity categoryDTO;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "menu_sq")
    private List<ImgEntity> imgDTOList = new ArrayList<>();


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "side_has_menu",
            joinColumns = @JoinColumn(name = "menu_sq"),
            inverseJoinColumns = @JoinColumn(name = "side_sq")
    )
    private Set<SideEntity> side = new HashSet<>();

}
