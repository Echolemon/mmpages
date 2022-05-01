/* Routing module: only responsible for distributing network requests to the C layer, not processing */

// Import C layer
var flowersController = require("./controllers/flowersController.js");
var adminController = require("./controllers/adminController.js");
var mmController = require("./controllers/mmController.js");
var nextmmController = require("./controllers/nextmmController.js");
var aboutController = require("./controllers/aboutController.js");
var mediasController = require("./controllers/mediasController.js");

// 1. Import express module
var express = require("express");

// 2. Create the router
var router = express.Router();

const ROOT_URL = "/api";
/* Route distribution
 *  The route design can be found here: https://confluence.cis.unimelb.edu.au:8443/display/SWEN900132021MM/API+Endpoints
 */

// Glass Flowers public endpoints
router.get(ROOT_URL + "/flower", flowersController.fetchFlowers);
router.get(ROOT_URL + "/flower/:id", flowersController.fetchFlower);
router.get(ROOT_URL + "/video/flower", flowersController.fetchVideos);

//Missing Mezzuzot public end points
router.get(ROOT_URL + "/mm", mmController.fetchAllMezzuzahStories);
router.get(ROOT_URL + "/mm/:id", mmController.fetchMezzuzahStory);

//Next Missing Mezzuzot public end points
router.get(ROOT_URL + "/next/:prev_id", nextmmController.fetchNextMezzuzahStory);

// About end point
router.get(ROOT_URL + "/about/:category", aboutController.fetchAbout);
// // Home page will use about table
router.get(ROOT_URL + "/about/home", aboutController.fetchAbout);

// Admin endpoints
router.post(ROOT_URL + "/admin/flower", adminController.addOrUpdateFlower);
router.post(ROOT_URL + "/admin/flower/delete", adminController.deleteFlower);

router.post(ROOT_URL + "/admin/mm", adminController.addOrUpdateMezzuzahStory);
router.post(ROOT_URL + "/admin/mm/delete", adminController.deleteMezzuzahStory);

router.post(ROOT_URL + "/admin/next", adminController.addOrUpdateNextMezzuzahStory);
router.post(ROOT_URL + "/admin/next/delete", adminController.deleteNextMezzuzahStory);

router.post(ROOT_URL + "/admin/about", adminController.addOrUpdateAboutInfo);
router.post(ROOT_URL + "/admin/about/delete", adminController.deleteAboutInfo);

router.post(ROOT_URL + "/admin/media", adminController.addOrUpdateMedia);
router.post(ROOT_URL + "/admin/media/delete", adminController.deleteMedia);

// Media Endpoints
router.get(ROOT_URL + "/media", mediasController.fetchMedias);
router.get(ROOT_URL + "/media/:id", mediasController.fetchMedia);

// 3. Export the router mode
module.exports = router;
