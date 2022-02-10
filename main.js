const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';

const request = require('request');
const cheerio = require('cheerio');

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


    getAllMatchLink(fullLink);
}

function getAllMatchLink(uri){
    request(uri , function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractAllLink(html);
        }
    })
}

function extractAllLink(html){
    let $ = cheerio.load(html);


    let scoreCardArr = $('a[data-hover="Scorecard"]')

    for(let i=0 ; i<scoreCardArr.length ;i++){
        let link = $(scoreCardArr[i]).attr('href');
        let fullLink = 'https://www.espncricinfo.com/' + link;
        console.log(fullLink)
    }
}


