import cardPayGif from './../../img/ICInsert.gif';
import cardSound from './../../voice/카드를 꽂아주세요.wav'
import {useEffect} from "react";

const CardPay = () => {

    useEffect(() => {
        let audio = new Audio(cardSound);
        audio.play();
    }, []);

    return (
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="card-gif">
                <img src={cardPayGif} alt={'카드 리더기 gif'}/>
            </div>
        </div>
    );
}
export default CardPay;