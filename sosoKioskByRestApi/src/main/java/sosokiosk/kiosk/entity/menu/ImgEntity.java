package sosokiosk.kiosk.entity.menu;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "img")
public class ImgEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgSq;

    @Column(name = "menu_sq")
    private Long menuSq;

    @Column(name = "img_name") //200
    private String imgName;

    @Column(name = "img_path") //200
    private String imgPath;

    @Column(name = "img_date")  //200
    private String imgDate;

    @Column(name = "img_extension") //200
    private String imgExtension;

//    @ManyToOne
//    @JoinColumn(name = "menu_sq", insertable = false, updatable = false)
//    private MenuEntity menuDTO;

}
