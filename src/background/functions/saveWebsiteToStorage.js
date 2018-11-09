import moment from 'moment';
import RGBaster from 'rgbaster';
import findClosestColor from './findClosestColor';

// save website to local storage
export default function saveWebsiteToStorage(websiteInfo, colorTable) {
  return new Promise(resolve => {
    let website = {
      domain: websiteInfo.domain,
      favicon: websiteInfo.favicon,
      count: 1,
      time: 0,
    };

    extractDominantColors(websiteInfo, colorTable, website).then(websiteWithColors => {
      saveToStorage(websiteInfo, websiteWithColors);
      resolve();
    });
  });
}

function extractDominantColors(websiteInfo, colorTable, website) {
  return new Promise(resolve => {
    if (!websiteInfo.favicon === '' || websiteInfo.favicon) {
      RGBaster.colors(websiteInfo.favicon, {
        exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        success: function(payload) {
          let dominantColor = payload.dominant;

          dominantColor = dominantColor
            .substring(4, dominantColor.length - 1)
            .replace(/ /g, '')
            .split(',');

          let colorClassification = findClosestColor(dominantColor[0], dominantColor[1], dominantColor[2], colorTable);
          website.color = colorClassification;
          resolve(website);
        },
      });
    } else {
      resolve(website);
    }
  });
}

function saveToStorage(websiteInfo, website) {
  console.log(website);
  let today = moment().format('YYYY-MM-DD');

  if (websiteInfo.domain !== 'newtab' && websiteInfo.domain !== '') {
    // test if the local storage with the key 'websites' is empty
    if (localStorage.getItem(today) === null) {
      let websites = [];
      websites.push(website);
      localStorage.setItem(today, JSON.stringify(websites));
      // else get existent websites and check if new website is unique
    } else {
      let websites = JSON.parse(localStorage.getItem(today));
      let domains = [];
      for (let i = 0; i < websites.length; i++) {
        // push all existing domains in an array
        domains.push(websites[i].domain);
      }
      // check if the new website domain is already in local storage
      let domainExists = domains.indexOf(websiteInfo.domain) > -1;
      // new website
      if (domainExists === false) {
        websites.push(website);
        localStorage.setItem(today, JSON.stringify(websites));
        // if websites already in local storage
      } else {
        for (let i = 0; i < websites.length; i++) {
          if (websites[i].domain === websiteInfo.domain) {
            // counter++ if prev site isnt current site
            if (websiteInfo.prevDomain !== websiteInfo.domain) {
              websites[i].count++;
            }
            // if favicon is undefined retry get the icon
            if (!websites[i].favicon) {
              websites[i].favicon = websiteInfo.favicon;
            }
          }
        }
        // when time and counter is set, save websites in local storage
        localStorage.setItem(today, JSON.stringify(websites));
      }
    }
  }
}
