import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import EmojiPeople from '@material-ui/icons/EmojiPeople';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { useStyles } from './Drawer.styles';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import {
    Link
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Uploader from './Uploader';
import Base64 from './Base64';

function TemporaryDrawer(props) {

    const {
        _openDrawerLoadingImage,
        _setOpenDrawerUploadImage
    } = props;

    const {
        t
    } = useTranslation();

    const i18 = [
        {
            i18: t('home'),
            route: 'Home',
            icon: Home
        },
        {
            i18: t('employees'),
            route: 'Employees',
            icon: EmojiPeople
        },
        {
            i18: t('setting'),
            route: 'Setting',
            icon: BlurCircular
        }
    ]

    const classes = useStyles();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        _setOpenDrawerUploadImage(open);
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >

            <Divider />
            <div className={classes.margin}></div>

            <List >
                {i18.map((item, index) => (
                    <Link
                        key={index}
                        to={item.route}
                        key={index}
                        className={classes.link}
                    >
                        <ListItem
                            button
                            key={item.i18}
                        >
                            <ListItemIcon>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.i18}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />

        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={_openDrawerLoadingImage}
                    onClose={toggleDrawer(false)}>
                    <Uploader />
                    <Base64 />
                </Drawer>
            </React.Fragment>
        </div>
    );
}

const mapStateToProps = state => ({
    ...state,
    _openDrawerLoadingImage: state.nav.openDrawerLoadingImage
})

const mapDispatchToProps = dispatch => ({
    _setOpenDrawerUploadImage: (open) => dispatch(actions.setOpenDrawerUploadImage(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer)

