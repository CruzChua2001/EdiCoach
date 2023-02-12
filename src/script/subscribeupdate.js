import axios from "axios"

export const subscribeTopic = () => {
    let url = "https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/subscribesns"
    let obj = {"Email": document.getElementById("footerSubscribe").value}
    axios.post(url, JSON.stringify(obj))
    .then(res => {
        console.log(res)
    })
}