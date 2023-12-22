
 function signInButtonClick() {
    const body = {
        "provider": "native",
        "email": "stylishtest_abcdefgh@test.com",
        "password": "1qaz@WSX"
    }
    fetch('/api/1.0/user/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            alert("Request error")
        }else{
            response.json().then(res => {
                access_token = res.data.access_token
                console.log(access_token)
            })
        }
    }).catch(error => {
        alert(`Something went wrong: ${error}`)
    })
    signInButton.style.display = "none"
    paymentContainer.style.display = "block"
}