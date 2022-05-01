package sosokiosk.kiosk.entity.side;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "menu_side_img")
public class MenuSideImgEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_side_img_sq")
    private Long menuSideImgSq;

    @Column(name = "menu_side_sq")
    private Long menuSideSq;

    @Column(name = "menu_side_img_name")
    private String menuSideImgName;

    @Column(name = "menu_side_img_path")
    private String menuSideImgPath;

    @Column(name = "menu_side_img_date")
    private String menuSideImgDate;

    @Column(name = "menu_side_img_extension")
    private String menuSideImgExtension;

//    @ManyToOne
//    @JoinColumn(name = "menu_side_sq", insertable = false, updatable = false)
//    private MenuSideEntity menuSideEntity;
}
