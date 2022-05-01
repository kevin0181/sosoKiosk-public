package sosokiosk.kiosk.entity.side;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.entity.order.OrderDetailSideEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "menu_side")
public class MenuSideEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_side_sq")
    private Long menuSideSq;

//    @Column(name = "side_sq") //200
//    private Long sideSq;

    @Column(name = "side_category_sq") //200
    private Long sideCategorySq;

    @Column(name = "menu_side_name") //200
    private String menuSideName;

    @Column(name = "menu_side_price") //200
    private String menuSidePrice;

    @Column(name = "menu_side_sold_out")
    private boolean menuSideSoldOut;

    @Column(name = "menu_side_enable")
    private boolean menuSideEnable;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "menu_side_sq")
    private List<MenuSideImgEntity> menuSideImgDTOList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "menu_side_sq")
    private OrderDetailSideEntity orderDetailSideEntity;

    @ManyToOne
    @JoinColumn(name = "side_category_sq", insertable = false, updatable = false)
    private SideCategoryEntity sideCategoryDTO;
}
