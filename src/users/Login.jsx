import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Button
} from 'reactstrap';
import styles from '../styles/Login.module.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { SHA256 } from '../data/HashPassWord';
import Resgister from './Resgister';
import Axios from 'axios';
import Recaptcha from '../data/Recaptcha';
import SearchID from './SearchID';
import SearchPW from './SearchPW'

class Login extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)
    const { cookies } = this.props;
    this.idRef = React.createRef();
    this.pwRef = React.createRef();
    this.reCaptchaRef = React.createRef();
    this.state = {
      isModal: false,
      idModal: false,
      pwModal: false,
      reCaptchaLoad: false,
      reCaptchaValue: null,
      reCaptchaCallback: false,
      reCaptchaExpired: false,
      checkIP: cookies.get('ip') || 0,
    }
  }

  setIPCheck = () => {
    const { cookies } = this.props;
    this.setState(({ checkIP }) => ({
      checkIP: parseInt(checkIP) + 1,
    }), () => {
      cookies.set('ip', this.state.checkIP, { path: '/' })
    })
  }

  removerCookies = () => {
    const { cookies } = this.props;
    cookies.remove('ip')
  }

  loginPush = async () => {
    const { cookies } = this.props;
    const { history } = this.props;
    await Axios.post('http://192.168.0.1/login',
      {
        user_id: this.idRef.current.value,
        user_pw: SHA256(this.pwRef.current.value),
        recaptcha: this.state.reCaptchaValue,
      })
      .then((res) => {
        console.log(res.data)
        const { jwt } = res.data;
        cookies.set('jwt', jwt, { path: '/' })
        console.log(res.data)
        if (res.data.statusCode === 100) {
          Axios.defaults.headers.common['jwt'] = `${cookies.get('jwt')}`
          cookies.set('id', this.idRef.current.value, { path: '/' })
          this.removerCookies();
          history.push('/main');
        } else if (res.data.statusCode !== 100) {
          this.setIPCheck();
          if (parseInt(cookies.get('ip')) === 3) {
            alert('로그인 시도 횟수 (3/5')
          } else if (parseInt(cookies.get('ip')) === 4) {
            alert('로그인 시도 횟수 (4/5')
          } else if (parseInt(cookies.get('ip')) > 4) {
            history.push('/notfound')
          }
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  toggle = () => {
    this.setState(({ isModal }) => ({
      isModal: !isModal,
    }))
  }

  idToggle = () => {
    this.setState(({ idModal }) => ({
      idModal: !idModal,
    }))
  }

  pwToggle = () => {
    this.setState(({pwModal}) => ({
      pwModal: !pwModal,
    }))
  }

  reCaptchaGet = () => {
    const DELAY = 1500;
    setTimeout(() => {
      this.setState({ reCaptchaLoad: true })
    }, DELAY)
  }

  handleChange = (value) => {
    this.setState({ reCaptchaValue: value })
    if (value === null) this.setState({ reCaptchaExpired: true })
  }

  asyncScriptOnLoad = () => {
    this.setState({ reCaptchaCallback: true })
  }

  render() {
    console.log('Login')
    const { isModal, reCaptchaLoad } = this.state;
    const { history } = this.props;
    return (
      <Container fluid>
        <Row className={styles.container}>

          <Col
            className={styles.img}
            md={{ size: 7 }}>
          </Col>

          <Col className={styles.form} md>

            <Form>

              <FormText className={styles.title}>Welcome back</FormText>
              <FormText className={styles.subtitle}>Login to your account</FormText>

              <FormGroup>
                <FormText className={styles.inputtext}>ID</FormText>
                <Input
                  type={'text'}
                  innerRef={this.idRef} />
              </FormGroup>

              <FormGroup>
                <FormText className={styles.inputtext}>Password</FormText>
                <Input
                  type={'password'}
                  innerRef={this.pwRef} />
              </FormGroup>

              <Col className={styles.textcontainer}>
                <FormText
                  id={styles.pwbtn}
                  className={styles.text}
                  color={'primary'}
                  onClick={this.idToggle}
                >Forgot ID?</FormText>
                <SearchID isModal={this.state.idModal} toggle={this.idToggle}/>
              </Col>

              <Col className={styles.textcontainer}>
                <FormText
                  id={styles.pwbtn}
                  className={styles.text}
                  color={'primary'}
                  onClick={this.pwToggle}
                >Forgot PW?</FormText>
                <SearchPW isModal={this.state.pwModal} toggle={this.pwToggle} history={history}/>
              </Col>

              <Button
                className={styles.btn}
                color={'success'}
                block
                onClick={this.loginPush}
              >Login Now</Button>

              <FormGroup className={styles.textsubcontainer}>
                <FormText
                  id={styles.texttitle}
                  className={styles.text}
                >Dont have an account?</FormText>
                <FormText
                  id={styles.resbtn}
                  className={styles.text}
                  color={'primary'}
                  onClick={this.toggle}
                >Join free today</FormText>
                <Resgister isModal={isModal} toggle={this.toggle} />
              </FormGroup>

              <FormGroup className={styles.recaptchacontainer}>
                <Recaptcha
                  reCaptchaLoad={reCaptchaLoad}
                  reCaptchaGet={this.reCaptchaGet}
                  handleChange={this.handleChange}
                  asyncScriptOnLoad={this.asyncScriptOnLoad}
                  reCaptchaRef={this.reCaptchaRef} />
              </FormGroup>
            </Form>

          </Col>
        </Row>
      </Container>
    );
  }
}
export default withCookies(Login);