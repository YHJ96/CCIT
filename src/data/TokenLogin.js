export default handlePost = async () => {
  const { Value } = this.props;
  await Axios({
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods' : 'POST',
      // 'Access-Control-Allow-Headers' : 'x-requested-with, content-type',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    url: 'http://192.168.0.152:9999/test',
    data: qs.stringify({
      Captcha: Value,
    })
  })
    .then((res) => {
      console.log(res)
      // const { accessToken } = res.data;
      // Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // console.log(accessToken);
    })
    .catch((err) => {
      alert(`에러코드 : ${err}`);
    });
}

export default handlePostJWT = () => {
  const { Value } = this.props;
  Axios.post('http://192.168.0.152:9999/test',
    {
      id: 1,
    }, { withCredentials: true })
    .then((res) => {
      console.log(res)
    })
}