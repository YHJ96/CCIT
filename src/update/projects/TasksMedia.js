import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Media, Badge } from 'reactstrap';
import { Circle } from 'react-bootstrap-icons';
import { Colors } from '../system/Colors';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Axios from 'axios';
import { DataCry } from '../../data/DataCry';

class TasksMedia extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.props = props;
        this.title = this.props.title;
        this.farmkey = this.props.farmkey;
        this.state = {
            log: [],
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/env";
        Axios.post(url,
            {
                user_id: `${cookies.get('id')}`,
                farm_id: `${this.farmkey}`,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                const filter = res.data.payload.filter((item) => {
                    if (item.TEMP < parseInt(cookies.get(`${this.farmkey}ftmin`)) ||
                        item.TEMP > parseInt(cookies.get(`${this.farmkey}ftmax`)) ||
                        item.HUMID < parseInt(cookies.get(`${this.farmkey}fhmin`)) ||
                        item.HUMID > parseInt(cookies.get(`${this.farmkey}fhmax`)) ||
                        item.CO2 < parseInt(cookies.get(`${this.farmkey}fcmin`)) ||
                        item.CO2 > parseInt(cookies.get(`${this.farmkey}fcmax`))) {
                        return item
                    }
                    return false
                })
                this.setState({
                    log: filter
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    createAlert = () => {
        return this.state.log.map((item) => {
            return <Media key={item.DATE}>
                    <Media left className="mr-3">
                        <Badge pill style={{ backgroundColor: Colors[this.props.badgeColor] }}>
                            {this.props.pillInfo}
                        </Badge>
                    </Media>
                    <Media body>
                        <div className="mt-0 mb-2">
                            {this.title}
                        </div>
                        <div className="mb-0">
                            {'이상값 발생'}
                        </div>
                    </Media>
                    <Media right className="ml-3">
                        <i>
                            <Circle style={{ backgroundColor: Colors[this.props.iconColor], color: Colors[this.props.iconColor], borderRadius: 100 }} />
                        </i>
                    </Media>
                </Media>
        })
    }

    render() {
        return (
            <>
            {this.createAlert()}
            </>
        );
    }
}

TasksMedia.propTypes = {
    iconColor: PropTypes.node,
    badgeColor: PropTypes.node,
    pillInfo: PropTypes.string,
};
TasksMedia.defaultProps = {
    iconColor: "youtube",
    pillInfo: "경고",
    badgeColor: "danger"
};

export default withCookies(TasksMedia);