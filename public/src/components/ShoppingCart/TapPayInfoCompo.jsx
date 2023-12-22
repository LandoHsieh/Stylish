import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import '../../CSS/tappay.css'


export default function TapPayInfoCompo({
    shouldSubmit, 
    setShouldSubmit, 
    name,
    phoneNumber,
    address,
    email,
    deliveryTime
    })
{
    const navigate = useNavigate()
    const [tappayStatus, setTappayStatus] = useState({});
    const [formStatus, setFormStatus] = useState({
        number: 'normal',
        expiry: 'normal',
        ccv: 'normal'
    });
    const [cardType, setCardType] = useState('');

    useEffect(() => {
        TPDirect.setupSDK('12348', 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')

        TPDirect.card.setup({
            fields: {
                number: {
                    element: '#card-number',
                    placeholder: '**** **** **** ****'
                },
                expirationDate: {
                    element: document.getElementById('tappay-expiration-date'),
                    placeholder: 'MM / YY'
                },
                ccv: {
                    element: "#ccv",
                    placeholder: '後三碼'
                }
            },
            styles: {
                'input': {
                    'color': 'gray'
                },
                'input.ccv': {
                    // 'font-size': '16px'
                },
                ':focus': {
                    'color': 'black'
                },
                '.valid': {
                    'color': 'green'
                },
                '.invalid': {
                    'color': 'red'
                },
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': 'orange'
                    }
                }
            },
            // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 6,
                endIndex: 11
            }
        })

        TPDirect.card.onUpdate((update) => {
            setTappayStatus(update);
            setCardType(update.cardType === 'unknown' ? '' : update.cardType);
            updateFormStatus('number', update.status.number);
            updateFormStatus('expiry', update.status.expiry);
            updateFormStatus('ccv', update.status.ccv);
        })
    }, [])

    useEffect(() => {
        if (shouldSubmit){
            console.log('submitted')
            document.getElementById('submitBtn').click()
            setShouldSubmit(false)
        }
    }, [shouldSubmit, setShouldSubmit])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!tappayStatus.canGetPrime) {
            alert('can not get prime')
            return
        }

        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        const shoppingList = []
        shoppingCart.map(item => {
            const item2list = {
                id: item.id,
                name: item.title,
                price: item.price,
                color: {
                    code: item.color,
                    name: item.colorName
                },
                size: item.size,
                qty: item.amount
            }
            shoppingList.push(item2list)
        })
        console.log("shoppingList: ", shoppingList)

        const subtotalPrice = shoppingCart.reduce((sum, item) => {
            return sum + item.totalPrice;
        }, 0);
        
        const freight = 30

        const requestBody = {
            provider: "native",
            email: "stylishtest_abcdefgh@test.com",
            password: "1qaz@WSX"
        }
        var access_token
        fetch('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if (!response.ok) {
                console.log("Login error")
            } else {
                response.json().then(res => {
                    access_token = res.data.access_token
                    localStorage.setItem('access_token', res.data.access_token)
                })
                TPDirect.card.getPrime(async (result) => {
                    if (result.status !== 0) {
                        alert('get prime error ' + result.msg);
                        return;
                    }
                    let prime = result.card.prime;
                    console.log(prime);
                    //data應該在前端介面依照使用者輸入再傳到後端去建
                    var data = {
                        "prime": prime,
                        "order": {
                            "shipping": "delivery",
                            "payment": "credit_card",
                            "subtotal": subtotalPrice,
                            "freight": freight,
                            "total": subtotalPrice + freight,
                            "recipient": {
                                "name": name,
                                "phone": phoneNumber,
                                "email": email,
                                "address": address,
                                "time": deliveryTime
                            },
                            "list": shoppingList
                        }
                    }

                    fetch('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/order/checkout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${access_token}`
                        },
                        body: JSON.stringify(data)
                    }).then(response => {
                        if (!response.ok) {
                            alert("Request error")
                        } else {
                            response.json().then(res => {
                                const orderId = res.data.orderId
                                const orderTime = new Date()
                                navigate(`/thanks?orderid=${orderId}&ordertime=${orderTime}`)
                            })

                        }
                    }).catch(error => {
                        alert(`Something went wrong: ${error}`)
                    })
                });
            }
        })


    };

    const updateFormStatus = (field, status) => {
        setFormStatus(prevStatus => ({
            ...prevStatus,
            [field]: status === 2 ? 'error' : status === 0 ? 'success' : 'normal'
        }));
    };

    return (
        <div className="mx-6 xl:mx-[60px] mt-[50px]">
            <div className=" mb-[25px]">
                <div className=" text-base font-bold text-stone-700 mb-4">付款資料</div>
                <div className="h-[0px] w-full border border-stone-700"></div>
            </div>
            <form onSubmit={handleSubmit} className="mb-[50px] gap-9 flex flex-col " id="tappay-form">
                <div className={`items-center  max-w-[685px] xl:flex  ${formStatus.number}`}>
                    <label htmlFor="card-number" className=" flex w-[120px] text-stone-700 text-sm xl:text-base font-normal">
                        信用卡號碼
                    </label>
                    <div className="tpfield" id="card-number"></div>
                </div>
                <div className={` items-center max-w-[685px] xl:flex expiration-date-group ${formStatus.expiry}`}>
                    <label htmlFor="expiration-date" className="flex w-[120px] text-stone-700 text-sm xl:text-base font-normal">
                        有效期限
                    </label>
                    <div className="tpfield" id="tappay-expiration-date"></div>
                </div>
                <div className={` items-center max-w-[685px] xl:flex ccv-group ${formStatus.ccv}`}>
                    <label htmlFor="ccv" className="flex w-[120px] text-stone-700 text-sm xl:text-base font-normal">
                        安全碼
                    </label>
                    <div className="tpfield" id="ccv"></div>
                </div>

                <button id="submitBtn" type="submit" className="hidden btn btn-default" disabled={!tappayStatus.canGetPrime}>Pay</button>
            </form>
        </div>
    )
}
