
const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';

const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const path = require('path');

const allMatchObj = require('./allMatch');

let iplPath = path.join(__dirname , 'IPL')

function dirCreator(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath)
    }
}

// console.log(__dirname)  // yeh hume parent directory ka path dega

dirCreator(iplPath)

request(url,cb)

function cb(error , response , html){
    if(error){
        console.error(error);
    }
    else{
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorElem = $('a[data-hover="View All Results"]');  // tki jb view results pr jye toh sare results show krde

    let link = anchorElem.attr('href');  // href attribute mn link the view more results ki

    console.log(link);

    let fullLink = 'https://www.espncricinfo.com' + link;  // taki puri link show ho and uspr jaskee
    console.log(fullLink);


    allMatchObj.getAllMatch(fullLink);
}

