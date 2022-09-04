import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SessionState } from "../../features/session/session";
import { useAppSelector } from "../../app/hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
   marginLeft: "auto",
   transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
   }),
}));

export default React.memo((): JSX.Element => {
   const session: any = useAppSelector((state) => state.session);
   const {
      token = "",
      email = "",
      displayName = "NA",
      photoUrl = "https://i.ibb.co/PtDp2nH/noImage.png",
      uid = "NA",
      createdAt,
      bio,
      lastLoginAt,
   } = session.user;
   const d = new Date(lastLoginAt);
   const c = new Date(createdAt);
   const [expanded, setExpanded] = React.useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   return (
      <Card sx={{ maxWidth: 550 }}>
         <CardHeader
            avatar={
               <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  S
               </Avatar>
            }
            action={
               <IconButton aria-label='settings'>
                  <MoreVertIcon />
               </IconButton>
            }
            title='User Profile'
            subheader={displayName}
         />
         <CardMedia
            component='img'
            height='210'
            image={photoUrl}
            alt={displayName}
         />
         <CardContent>
            <Typography variant='body2' color='text.secondary'>
               This is the user Profile for {displayName}
            </Typography>
            <List
               sx={{
                  width: "100%",
                  maxWidth: 550,
                  bgcolor: "background.paper",
               }}
            >
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <EmailIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Email' secondary={"" + email} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <DateRangeIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Login' secondary={"" + d} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <DateRangeIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Created' secondary={"" + c} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <LockIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                     primary='UID'
                     secondary={"" + token.toString().slice(0, 50)}
                  />
               </ListItem>
            </List>
         </CardContent>
         <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
               <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
               <ShareIcon />
            </IconButton>
            <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label='show more'
            >
               <ExpandMoreIcon />
            </ExpandMore>
         </CardActions>
         <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
               <Typography paragraph>Bio:</Typography>
               <Typography paragraph>{bio}</Typography>
            </CardContent>
         </Collapse>
      </Card>
   );
});
