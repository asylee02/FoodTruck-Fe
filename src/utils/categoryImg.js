export function CategoryImg(category){

    const url = process.env.PUBLIC_URL
    switch (category){
        case '붕어빵':
            return <img src={`${url}/assets/fishBread.png`} alt="붕어빵" />
        case '분식':
            return <img src={`${url}/assets/snack.png`} alt="분식" />
        case '호떡':
            return <img src={`${url}/assets/hodduck.png`} alt="호떡" />
        case '와플':
            return <img src={`${url}/assets/waffle.png`} alt="와플" />
        case '문어빵':
            return <img src={`${url}/assets/takoyaki.png`} alt="문어빵" />
        case '토스트':
            return <img src={`${url}/assets/toast.png`} alt="토스트" />
        case '군고구마':
            return <img src={`${url}/assets/sweet-potato.png`} alt="군고구마" />
        case '스테이크':
            return <img src={`${url}/assets/steak.png`} alt="스테이크" />
        case '디저트':
            return <img src={`${url}/assets/dessert.png`} alt="디저트" />
        case '기타':
            return <img src={`${url}/assets/streetfood.png`} alt="기타" />
        default:
            return <img src={`${url}/assets/streetfood.png`} alt="기타" />
    }
}