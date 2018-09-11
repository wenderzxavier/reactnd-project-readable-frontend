import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        minWidth: 475,
        margin: 6,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    comment: {
        marginTop: 12,
    }

}


class PostCard extends Component {
    render() {
        const { classes, post } = this.props;
        return (
            <Link style={{ textDecoration: 'none' }} to={"/posts/" + post.id}>
                <div className="divPost" onClick={() => { console.log("Clicked") }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                {post.category.toUpperCase()}
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {post.title}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {post.author} | {new Date(post.timestamp * 1e3).toString().slice(0, 10)}
                            </Typography>
                            <Typography component="p">
                                {post.body}
                            </Typography>
                            <Typography className={classes.comment} color="textSecondary">
                                Comments ({post.commentCount})
                    </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Link>
        );
    }
}

PostCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard);