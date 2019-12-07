import _ from "lodash";
import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive,
  Popup
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

let rightMenuItems = (currentUser) => {
  const rightItems = [
    {to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
    ]
    if (currentUser){
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
    }
    return rightItems
  }


const NavBarMobile = ({
  children,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      size='mini'
      vertical
      visible={visible}
      width='thin'
    >
    <Menu.Item as={NavLink} to="/" name="Home" size='mini' key="minihome">
     <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={NavLink} to="/roots" name="Roots" size='mini' key="miniroots">
    <Icon name="leaf" />
       Roots
    </Menu.Item>
    <Menu.Item as={NavLink} to="/stems" name="Stems" key="ministems">
    <Icon name="code branch" />
       Stems
    </Menu.Item>
    <Menu.Item as={NavLink} to="/affixes" name="Affixes" key="miniaffixes">
    <Icon name="sort alphabet down" />
       Affixes
    </Menu.Item>
    <Menu.Item as={NavLink} to="/texts" name="Texts" key="minitexts">
    <Icon name="comment" />
       Texts
    </Menu.Item>
    <Menu.Item as={NavLink} to="/audio" name="Audio" key="miniaudio">
    <Icon name="file audio" />
       Audio
    </Menu.Item>
    <Menu.Item as={NavLink} to="/spelling" name="Spelling" key="minispelling">
     <Icon name="font" />
       Spelling
    </Menu.Item>
    <Menu.Item as={NavLink} to="/bibliography" name="Bibliography" key="minibib">
    <Icon name="book" />
       Bibliography
    </Menu.Item>
    <Menu.Item as={NavLink} to="/contactus" name="Contact" key="minicontact">
    <Icon name="mail" />
       Contact
    </Menu.Item>
    <Menu.Item as={NavLink} to="/elicitations" name="Elicitations" key="minielic">
    <Icon name="talk" />
       Elicitations
    </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
        <Menu fixed="top" inverted>
          <Menu.Item key="side" onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {_.map(rightItems, item  => <Popup content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
          </Menu.Menu>
        </Menu>
        {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ rightItems }) => (
  <Menu fixed="top" inverted>
    <Menu.Item as={NavLink} to="/" name="home" key="mhome">
       <Icon name="home" />
    </Menu.Item>
    <Menu.Item as={NavLink} to="/roots" name="Roots" key="mroots">
       Roots
    </Menu.Item>
    <Menu.Item as={NavLink} to="/stems" name="Stems" key="mstems">
       Stems
    </Menu.Item>
     <Menu.Item as={NavLink} to="/affixes" name="Affixes" key="maffixes">
       Affixes
    </Menu.Item>
    <Menu.Item as={NavLink} to="/texts" name="Texts" key="mtexts">
       Texts
    </Menu.Item>
    <Menu.Item as={NavLink} to="/audio" name="Audio" key="maudio">
       Audio
    </Menu.Item>
    <Menu.Item as={NavLink} to="/spelling" name="Spelling" key="mspelling">
       Spelling
    </Menu.Item>
    <Menu.Item as={NavLink} to="/bibliography" name="Bibliography" key="mbib">
       Bibliography
    </Menu.Item>
    <Menu.Item as={NavLink} to="/contactus" name="Contact" key="mcontact">
       Contact
    </Menu.Item>
    <Menu.Item as={NavLink} to="/elicitations" name="Elicitations" key="melicit">
       Elicitations
    </Menu.Item>
    <Menu.Menu position="right">
      {_.map(rightItems, item  => <Popup content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children} = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightMenuItems(this.props.users.currentUser)}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop rightItems={rightMenuItems(this.props.users.currentUser)} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

  function mapStateToProps (state, ownProps) {
    console.log('ownProps is ', ownProps)
    const {users} = state
     return {
       users,
       ...ownProps
     }
  }

//export default ( withApollo(connect(mapStateToProps)(NavBar)))
export default (withRouter (connect(mapStateToProps)(NavBar)))