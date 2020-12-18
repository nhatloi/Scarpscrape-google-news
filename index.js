const axios = require('axios')
const cheerio = require('cheerio')
const fs = require("fs");
const url= "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNREoyZUc0U0FuWnBLQUFQAQ?hl=vi&gl=VN&ceid=VN%3Avi"

const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}

const GoogleNews = async () =>{
    const content = await fetchData(url)
    const $ =cheerio.load(content)

    fs.writeFile('news.txt', '', function (err) {
        if (err) throw err;
      });
    console.log('writing...');
    $('.NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc').each((i,e)=>{
        const title = $(e).find('h3 >.DY5T1d').text();
        const source = $(e).find('.wEwyrc').text();
        const time =  $(e).find('.WW6dff').attr('datetime');
        const description = $(e).find('.xBbh9').text();
        const link = 'https://news.google.com/' + $(e).find('.VDXfz').attr("href") +'\n';
        const avatar =$(e).find('img.tvs3Id.QwxBBf').attr("src")+'\n';
        fs.appendFile('news.txt',title +'\n'
        + description +'\n'
        + link +'\n'
        + source +'\n'
        + time +'\n'
        + avatar +'\n'
        ,function (err) {
            if (err) throw err;
            });

    })
    console.log('save')
}

GoogleNews()