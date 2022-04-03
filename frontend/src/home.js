import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import vlogo from "./vishnulogo.jpg";
import homelogo from "./home.jpg";
import image from "./backgroundfinal1.jpg";
import merged1 from "./merged1.jpg";
import merged from "./merged.jpg";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';




const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
   // maxWidth: 1000, //345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'green',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar1: {
    background: '#32CD32',
    boxShadow: 'none',
    color: 'white'
  },
  appbar2: {
    background: '#000000',
    boxShadow: 'none',
    color: 'white',
  },
  app: {
    fontFamily: 'sans-serif',
  //  textAlign: 'center',
    width: '100%',
    margin: '0 auto'
  },
  loader: {
    color: '#be6a77 !important',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  tabs: {
    display: 'flex',
    listStyleType: 'none',
    background: 'black',
    alignItems: 'stretch',
   // padding: '3px 0',
  },
  tab: {
  //  padding: '5px 10px',
  //  paddingLeft: '10px',
  //  paddingRight: '10px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '30px',
  //  margin: '10px',
    flex: 1,
    textAlign: 'center'
  },
  // background-color: #f1f1f1;
  // width: 100px;
  // margin: 10px;
  // text-align: center;
  // line-height: 75px;
  // font-size: 30px;
  tabsTabPane: {
    padding: '10px',
    padding: '10px',
    margin: '10px',
    background: '#eee'
  },
  TabsStyle: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    margin: 0,
    padding: 0
  },
  activeClass: {
    background:'#696969',
  },
  backgroundImage1: {
    margin: "auto",
  //  maxWidth: 1200,
    height: 600,
    width: 1680,
 //   backgroundColor: 'green',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
 //   borderRadius: '15px',
  },
  backgroundImage2: {
    margin: "auto",
      height: 400,
      width: 1680,
      boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
  },
  heading: {
  //  display: "flex",
    alignItems:"center",
    flexGrow: 2
  }
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  const TabContext = React.createContext();

const Tabs = props => {
  const { children, defaultTab } = props;
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

const Tab = props => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);
  const { label, tabIndex } = props;
  const active = activeTab === tabIndex;

  return (
    <li
      onClick={() => setActiveTab(tabIndex)}
      className={`${active ? classes.activeClass : ""}`}
    >
      {" "}
      {label}{" "}
    </li>
  );
};


const TabPane = props => {
  const { activeTab } = React.useContext(TabContext);
  const { children, tabIndex } = props;

  if (activeTab === tabIndex) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

const style1 = {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  margin: 0,
  padding: 0
}

const style2 = {
  flex: 1,
  textAlign: 'center'
}

  //   const [selectedTab, setSelectedTab] = React.useState(0);

  //   const handleChange = (event, newValue) => {
  //     setSelectedTab(newValue);
  // };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
      <AppBar position="static" className={classes.appbar1}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
             Implementation of Potato Leaf Disease Classification using Machine Learning Algorithms
          </Typography>
          {/* <div className={classes.grow} /> */}
          <Avatar src={vlogo}></Avatar>
        </Toolbar>
      </AppBar>
      </div>
      {/* <AppBar position="static" className={classes.appbar2}> */}
      <div className={classes.app}> 
      <Tabs defaultTab={1}>
        <div className={classes.tabs}>
          <div className={classes.tab}>
          <Tab label="Home"  tabIndex={0} />
          </div>
          <div className={classes.tab}>
          <Tab label="Detection" style={{"paddingLeft":"10px"}} tabIndex={1} />
          </div>
        </div>

        <TabPane tabIndex={0}>
        <img src={homelogo} className={classes.backgroundImage1}/>
        <div className={classes.heading}>
        <h1 style={{"color":"green"}}>About Potato Plants</h1>
        </div>
        <p style={{"fontSize":"25px"}}>The potato is the most important non-cereal crop in the world, and fourth most important crop overall. Only corn, wheat, and rice are more important.
In the US, potato products are the second most consumed food overall, trailing only dairy products.Potato is consisted for 20% solids and 80% of water.
100 grams of potato has 75 grams of water, 19 g of carbohydrates (15 grams of Starch and 2.2 grams of dietary fiber), 2 grams of protein, 0.1 gram of fat,
and trace amounts of many vitamins (C, E, K, B6) and minerals and metals (magnesium, phosphorus, potassium, and more).
        </p>
        <div className={classes.heading}><h1 style={{"color":"green"}} >Early Blight in Potato</h1></div>
        <p style={{"fontSize":"25px"}}>Common on tomato and potato plants, early blight is caused by the fungus Alternaria solani and occurs throughout the United States. Symptoms first appear on the lower, 
older leaves as small brown spots with concentric rings that form a “bull’s eye” pattern. As the disease matures, it spreads outward on the leaf surface causing it to turn yellow, 
wither and die. Eventually the stem, fruit and upper portion of the plant will become infected. Crops can be severely damaged.

Early blight overwinters on infected plant tissue and is spread by splashing rain, irrigation, insects and garden tools. The disease is also carried on tomato seeds and in potato tubers.
In spite of its name, early blight can occur any time throughout the growing season. High temperatures (80-85˚F.) and wet, humid conditions promote its rapid spread.
In many cases, poorly nourished or stressed plants are attacked.</p>
      <div className={classes.heading}><h1 style={{"color":"green"}}>Symptoms of Early Blight</h1></div>
              <p style={{"fontSize":"25px"}}>
The first symptoms of early blight appear as small, circular or irregular, dark-brown to black spots on the older (lower) leaves 
Symptoms of early blight occur on fruit, stem and foliage of tomatoes and stem, foliage and tubers of potatoes.  Initial symptoms on leaves appear as small 1-2 mm 
black or brown lesions and under conducive environmental conditions the lesions will enlarge and are often surrounded by a yellow halo (Figures 1 and 2). 
Lesions greater than 10 mm in diameter often have dark pigmented concentric rings.  This so-called “bullseye” type lesion is highly characteristic of early blight
 (Figure 3). As lesions expand and new lesions develop entire leaves may turn chlorotic and dehisce, leading to significant defoliation.  
Lesions occurring on stems are often sunken and lens-shaped with a light center, and  have the typical concentric rings (Figure 4). </p>

      <br></br>
      <img src={merged} className={classes.backgroundImage2}/>

      <div className={classes.heading}><h1 style={{"color":"green"}}>Treatment for Early Blight</h1></div>
        <p style={{"fontSize":"25px"}}>
          <ul>
            <li>Prune or stake plants to improve air circulation and reduce fungal problems.</li>
            <li>Make sure to disinfect your pruning shears (one part bleach to 4 parts water) after each cut.</li>
            <li>Keep the soil under plants clean and free of garden debris. Add a layer of organic compost to prevent the spores from splashing back up onto vegetation.</li>
            <li>Drip irrigation and soaker hoses can be used to help keep the foliage dry.</li>
            <li>For best control, apply copper-based fungicides early, two weeks before disease normally appears or when weather forecasts predict a long period of wet weather. Alternatively, begin treatment when disease first appears, and repeat every 7-10 days for as long as needed.</li>
            <li>Containing copper and pyrethrins, Bonide Garden Dust is a safe, one-step control for many insect attacks and fungal problems. For best results, cover both the tops and undersides of leaves with a thin uniform film or dust. Depending on foliage density, 10 oz will cover 625 sq ft. Repeat applications every 7-10 days, as needed.</li>
            <li>SERENADE Garden is a broad spectrum, preventative bio-fungicide recommended for the control or suppression of many important plant diseases. For best results, treat prior to foliar disease development or at the first sign of infection. Repeat at 7-day intervals or as needed.</li>
            <li>Remove and destroy all garden debris after harvest and practice crop rotation the following year.</li>
            <li>Burn or bag infected plant parts. Do NOT compost.</li>
          </ul>
        </p>

        <br></br>
        <div className={classes.heading}>
        <h1 style={{"color":"green"}}>Late Blight in Potato</h1>
        </div>
        <p style={{"fontSize":"25px"}}>late blight, also called potato blight, disease of potato and tomato plants that is caused by the water mold Phytophthora infestans. 
The disease occurs in humid regions with temperatures ranging between 4 and 29 °C (40 and 80 °F). 
Hot dry weather checks its spread. Potato or tomato plants that are infected may rot within two weeks. 
        </p>
        <p style={{"fontSize":"25px"}}>When plants have become infected, lesions (round or irregularly shaped areas that range in colour from dark green to purplish black and resemble frost injury) appear on the leaves, 
petioles, and stems. A whitish growth of spore-producing structures may appear at the margin of the lesions on the underleaf surfaces. Potato tubers develop rot up to 15 mm (0.6 inch) deep. 
Secondary fungi and bacteria (particularly Erwinia species) often invade potato tubers and produce rotting that results in great losses during storage, transit, and marketing.</p>


<div className={classes.heading}><h1 style={{"color":"green"}}>Symptoms of Late Blight</h1></div>
        <p style={{"fontSize":"25px"}}>
          <ul>
            <li>Small water-soaked spots develop at the tips, margins or any other part of the leaf which enlarge to form irregular dark brown lesions surrounded by a light green halo.</li>
            <li>During morning hours, a whitish cottony growth of the fungus is visible around the dark brown lesions on the under surface of the leaves especially when weather remains sufficiently humid or when there is dew fall in the morning hours.</li>
            <li>If the weather turns dry, the lesions become necrotic and dry up.</li>
            <li>Under favourable weather conditions (low temperature, high humidity due to intermittent winter rains) the disease spreads rapidly and whole of the crop may be killed within 10-14 days giving blighted appearance.</li>
          </ul>
        </p>

        <img src={merged1} className={classes.backgroundImage2}/>

        <div className={classes.heading}><h1 style={{"color":"green"}}>Treatment for Late Blight</h1></div>
        <p style={{"fontSize":"25px"}}>
          <ul>
            <li>Apply a copper based fungicide (2 oz/ gallon of water) every 7 days or less, following heavy rain or when the amount of disease is increasing rapidly. If possible, time applications so that at least 12 hours of dry weather follows application.</li>
            <li>Used as a foliar spray, Organocide® Plant Doctor will work its way through the entire plant to prevent fungal problems from occurring and attack existing many problems. Mix 2 tsp/ gallon of water and spray at transplant or when direct seeded crops are at 2-4 true leaf, then at 1-2 week intervals as required to control disease.</li>
            <li>Safely treat fungal problems with SERENADE Garden. This broad spectrum bio-fungicide uses a patented strain of Bacillus subtilis and is approved for organic use. Best of all, SERENADE is completely non-toxic to honey bees and beneficial insects.</li>
            <li>Monterey All Natural Disease Control is a ready-to-use blend of naturally occurring ingredients that control most plant foliar diseases. All stages of the disease is controlled, but applying before infestation gives the best results.</li>
          </ul>
        </p>
        </TabPane>
        <TabPane tabIndex={1}>
         
      {/* </AppBar> */}
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
      {/* Change these three tags */}
      </TabPane>
      </Tabs>
      </div>
    </React.Fragment >
  );
};
