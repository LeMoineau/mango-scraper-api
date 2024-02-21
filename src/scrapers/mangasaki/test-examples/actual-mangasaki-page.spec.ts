import { expect } from "vitest";

export const MANGASAKI_HOME_PAGE_HTML = `
<div class="block-wrapper odd block_1">
    <div id="block-showmanga-lastest-list--2" class="block block-showmanga">
                        <div class="title block-title">Latest Manga UpreleaseDates</div>
                    <div class="content">
      <div class="item-list"><ul id="latest-list"><li class="first"><a href="/manga/martial-inverse"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200704124143323.jpg?itok=fduFVhkv" width="30" height="39" alt="Martial Inverse" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/martial-inverse"><strong>Martial Inverse</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/martial-inverse-378">Martial inverse 378</a><span class="tm">47 minutes ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/colorless"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200116214356648.jpg?itok=YqSaXlmS" width="30" height="39" alt="Colorless" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/colorless"><strong>Colorless</strong></a></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/colorless-44">Colorless 44</a><span class="tm">2 hours ago</span></li>
<li class="last"><a href="/chapter/colorless-43">Colorless 43</a><span class="tm">2 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/s-classes-i-raised"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111194236.png?itok=THrBzNNL" width="30" height="39" alt="The S-Classes That I Raised" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/s-classes-i-raised"><strong>The S-Classes That I Raised</strong></a><span class="new"><em> new</em></span></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/s-classes-i-raised-119">The S-Classes That I Raised 119</a><span class="tm">2 hours ago</span></li>
<li><a href="/chapter/s-classes-i-raised-118">The S-Classes That I Raised 118</a><span class="tm">2 hours ago</span></li>
<li class="last"><a href="/chapter/s-classes-i-raised-117">The S-Classes That I Raised 117</a><span class="tm">2 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/it-odd-i-became-adventurer-even-if-i-graduated-witchcraft-institute"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190724000940995.jpg?itok=8LGXDL75" width="30" height="39" alt="Is It Odd That I Became An Adventurer Even If I Graduated The Witchcraft Institute?" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/it-odd-i-became-adventurer-even-if-i-graduated-witchcraft-institute"><strong>Is It Odd That I Became An Adventurer Even If I Graduated The Witchcraft Institute?</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/it-odd-i-became-adventurer-even-if-i-graduated-witchcraft-institute-51">Is It Odd That I Became An Adventurer Even If I Graduated The Witchcraft Institute? 51</a><span class="tm">3 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/dragon-and-chameleon"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6" width="30" height="39" alt="Dragon and Chameleon" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/dragon-and-chameleon"><strong>Dragon and Chameleon</strong></a><span class="new"><em> new</em></span></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/dragon-and-chameleon-12">Dragon and Chameleon 12</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-11">Dragon and Chameleon 11</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-10">Dragon and Chameleon 10</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-9">Dragon and Chameleon 9</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-8">Dragon and Chameleon 8</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-7">Dragon and Chameleon 7</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-65">Dragon and Chameleon 6.5</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-6">Dragon and Chameleon 6</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-5">Dragon and Chameleon 5</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-4">Dragon and Chameleon 4</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-3">Dragon and Chameleon 3</a><span class="tm">3 hours ago</span></li>
<li><a href="/chapter/dragon-and-chameleon-2">Dragon and Chameleon 2</a><span class="tm">3 hours ago</span></li>
<li class="last"><a href="/chapter/dragon-and-chameleon-1">Dragon and Chameleon 1</a><span class="tm">3 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/tensei-shitara-dai-nana-ouji-dattanode-kimamani-majutsu-o-kiwamemasu"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200919234143450.jpg?itok=fExY54cu" width="30" height="39" alt="Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/tensei-shitara-dai-nana-ouji-dattanode-kimamani-majutsu-o-kiwamemasu"><strong>Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu</strong></a><span class="marker"><em> hot</em></span></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/tensei-shitara-dai-nana-ouji-dattanode-kimamani-majutsu-o-kiwamemasu-149">Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu 149</a><span class="tm">4 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/baki-rahen"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/i426118.jpg?itok=9xu-bvn4" width="30" height="39" alt="Baki Rahen" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/baki-rahen"><strong>Baki Rahen</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/baki-rahen-11">Baki Rahen 11</a><span class="tm">6 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/perfect-secret-love-bad-new-wife-little-sweet" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200228044003683.jpg?itok=dEx1HfNq" width="30" height="39" alt="Perfect Secret Love: The Bad New Wife is a Little Sweet" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/perfect-secret-love-bad-new-wife-little-sweet" rel="nofollow"><strong>Perfect Secret Love: The Bad New Wife is a Little Sweet</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/perfect-secret-love-bad-new-wife-little-sweet-429" rel="nofollow">Perfect Secret Love: The Bad New Wife is a Little Sweet 429</a><span class="tm">6 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/dong-gun"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190404085931963.jpg?itok=fhGhPNZM" width="30" height="39" alt="Dong Gun" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/dong-gun"><strong>Dong Gun</strong></a></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/dong-gun-94">Dong Gun 94</a><span class="tm">8 hours ago</span></li>
<li class="last"><a href="/chapter/dong-gun-95">Dong Gun 95</a><span class="tm">9 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/build"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200830063642766.jpg?itok=SvQMxKAY" width="30" height="39" alt="Build Up" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/build"><strong>Build Up</strong></a></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/build-143">Build Up 143</a><span class="tm">9 hours ago</span></li>
<li class="last"><a href="/chapter/build-142">Build Up 142</a><span class="tm">9 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/other-world-warrior"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190623035553533.jpg?itok=aZz4z6N_" width="30" height="39" alt="Other World Warrior" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/other-world-warrior"><strong>Other World Warrior</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/other-world-warrior-249">Other World Warrior 249</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/yankee-jk-kuzuhana-chan"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200403122008307.jpg?itok=7h0k9T1p" width="30" height="39" alt="Yankee JK KuzuHana-chan" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/yankee-jk-kuzuhana-chan"><strong>Yankee JK KuzuHana-chan</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/yankee-jk-kuzuhana-chan-184">Yankee JK KuzuHana-chan 184</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/mairimashita-iruma-kun"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190401222517278.jpg?itok=Pn4PIEq4" width="30" height="39" alt="Mairimashita! Iruma-Kun" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/mairimashita-iruma-kun"><strong>Mairimashita! Iruma-Kun</strong></a><span class="marker"><em> hot</em></span></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/mairimashita-iruma-kun-331">Mairimashita! Iruma-kun 331</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/blinded-setting-sun"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200616072259361.jpg?itok=nsNh2cbP" width="30" height="39" alt="Blinded by the Setting Sun" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/blinded-setting-sun"><strong>Blinded by the Setting Sun</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/blinded-setting-sun-144">Blinded by the Setting Sun 144</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/dimensional-mercenary-other-world-warrior"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200530125359202.jpg?itok=zdBp_S31" width="30" height="39" alt="Dimensional Mercenary ( Other World Warrior )" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/dimensional-mercenary-other-world-warrior"><strong>Dimensional Mercenary ( Other World Warrior )</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/dimensional-mercenary-other-world-warrior-249">Dimensional Mercenary ( Other World Warrior ) 249</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/angelic-lady" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20201120105025105.jpg?itok=IAw7GY7b" width="30" height="39" alt="Angelic Lady" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/angelic-lady" rel="nofollow"><strong>Angelic Lady</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/angelic-lady-149" rel="nofollow">Angelic Lady 149</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/blood-parasite"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF" width="30" height="39" alt="Blood Parasite" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/blood-parasite"><strong>Blood Parasite</strong></a><span class="new"><em> new</em></span></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/blood-parasite-10">Blood Parasite 10</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-9">Blood Parasite 9</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-8">Blood Parasite 8</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-7">Blood Parasite 7</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-6">Blood Parasite 6</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-5">Blood Parasite 5</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-4">Blood Parasite 4</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-3">Blood Parasite 3</a><span class="tm">10 hours ago</span></li>
<li><a href="/chapter/blood-parasite-2">Blood Parasite 2</a><span class="tm">10 hours ago</span></li>
<li class="last"><a href="/chapter/blood-parasite-1">Blood Parasite 1</a><span class="tm">10 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/shadow-house"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190505193013492.png?itok=TecLZWzE" width="30" height="39" alt="Shadow House" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/shadow-house"><strong>Shadow House</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/shadow-house-182">Shadow House 182</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/unordinary-manhwa" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190402085210744.jpg?itok=sgVd0v2Q" width="30" height="39" alt="unOrdinary" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/unordinary-manhwa" rel="nofollow"><strong>unOrdinary</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/unordinary-334" rel="nofollow">unOrdinary 334</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/absolute-martial-arts" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200831134914883.jpg?itok=faBWm2eo" width="30" height="39" alt="Absolute Martial Arts" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/absolute-martial-arts" rel="nofollow"><strong>Absolute Martial Arts</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/absolute-martial-arts-123" rel="nofollow">Absolute Martial Arts 123</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/limit-breaker"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20201126043545254.jpg?itok=Alo0s4Ke" width="30" height="39" alt="Limit Breaker" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/limit-breaker"><strong>Limit Breaker</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/limit-breaker-118">Limit Breaker 118</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li><a href="/manga/i-log-alone" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200205020104462.jpg?itok=ec1_x_5-" width="30" height="39" alt="I Log In Alone" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/i-log-alone" rel="nofollow"><strong>I Log In Alone</strong></a></div><div class="item-list"><ul id="c-list"><li class="first last"><a href="/chapter/i-log-alone-178" rel="nofollow">I Log In Alone 178</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
<li class="last"><a href="/manga/overgeared-team-argo-manhwa" rel="nofollow"><img class="pure-img" typeof="foaf:Image" src="https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200403063301898.jpg?itok=TfZltLFU" width="30" height="39" alt="Overgeared (Team Argo)" /></a><div class="item-list"><ul><li class="first last"><div class="tl"><a href="/manga/overgeared-team-argo-manhwa" rel="nofollow"><strong>Overgeared (Team Argo)</strong></a><span class="marker"><em> hot</em></span></div><div class="item-list"><ul id="c-list"><li class="first"><a href="/chapter/overgeared-team-argo-214" rel="nofollow">Overgeared (Team Argo) 214</a><span class="tm">11 hours ago</span></li>
<li class="last"><a href="/chapter/overgeared-team-argo-213" rel="nofollow">Overgeared (Team Argo) 213</a><span class="tm">11 hours ago</span></li>
</ul></div></li>
</ul></div></li>
</ul></div><a href="/latest_list"><strong>More latest chapters</strong></a>    </div>
  </div>
</div>
`;

export const MANGASAKI_HOME_RESULT_JSON = [
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200704124143323.jpg?itok=fduFVhkv",
    manga: { title: "Martial Inverse", id: "martial-inverse" },
    number: "378",
    title: "Martial inverse 378",
    id: "martial-inverse-378",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200116214356648.jpg?itok=YqSaXlmS",
    manga: { title: "Colorless", id: "colorless" },
    number: "44",
    title: "Colorless 44",
    id: "colorless-44",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200116214356648.jpg?itok=YqSaXlmS",
    manga: { title: "Colorless", id: "colorless" },
    number: "43",
    title: "Colorless 43",
    id: "colorless-43",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111194236.png?itok=THrBzNNL",
    manga: { title: "The S-Classes That I Raised", id: "s-classes-i-raised" },
    number: "119",
    title: "The S-Classes That I Raised 119",
    id: "s-classes-i-raised-119",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111194236.png?itok=THrBzNNL",
    manga: { title: "The S-Classes That I Raised", id: "s-classes-i-raised" },
    number: "118",
    title: "The S-Classes That I Raised 118",
    id: "s-classes-i-raised-118",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111194236.png?itok=THrBzNNL",
    manga: { title: "The S-Classes That I Raised", id: "s-classes-i-raised" },
    number: "117",
    title: "The S-Classes That I Raised 117",
    id: "s-classes-i-raised-117",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190724000940995.jpg?itok=8LGXDL75",
    manga: {
      title:
        "Is It Odd That I Became An Adventurer Even If I Graduated The Witchcraft Institute?",
      id: "it-odd-i-became-adventurer-even-if-i-graduated-witchcraft-institute",
    },
    number: "51",
    title:
      "Is It Odd That I Became An Adventurer Even If I Graduated The Witchcraft Institute? 51",
    id: "it-odd-i-became-adventurer-even-if-i-graduated-witchcraft-institute-51",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "12",
    title: "Dragon and Chameleon 12",
    id: "dragon-and-chameleon-12",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "11",
    title: "Dragon and Chameleon 11",
    id: "dragon-and-chameleon-11",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "10",
    title: "Dragon and Chameleon 10",
    id: "dragon-and-chameleon-10",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "9",
    title: "Dragon and Chameleon 9",
    id: "dragon-and-chameleon-9",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "8",
    title: "Dragon and Chameleon 8",
    id: "dragon-and-chameleon-8",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "7",
    title: "Dragon and Chameleon 7",
    id: "dragon-and-chameleon-7",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "6.5",
    title: "Dragon and Chameleon 6.5",
    id: "dragon-and-chameleon-65",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "6",
    title: "Dragon and Chameleon 6",
    id: "dragon-and-chameleon-6",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "5",
    title: "Dragon and Chameleon 5",
    id: "dragon-and-chameleon-5",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "4",
    title: "Dragon and Chameleon 4",
    id: "dragon-and-chameleon-4",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "3",
    title: "Dragon and Chameleon 3",
    id: "dragon-and-chameleon-3",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "2",
    title: "Dragon and Chameleon 2",
    id: "dragon-and-chameleon-2",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111182855.png?itok=y5TL04E6",
    manga: { title: "Dragon and Chameleon", id: "dragon-and-chameleon" },
    number: "1",
    title: "Dragon and Chameleon 1",
    id: "dragon-and-chameleon-1",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200919234143450.jpg?itok=fExY54cu",
    manga: {
      title:
        "Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu",
      id: "tensei-shitara-dai-nana-ouji-dattanode-kimamani-majutsu-o-kiwamemasu",
    },
    number: "149",
    title:
      "Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu 149",
    id: "tensei-shitara-dai-nana-ouji-dattanode-kimamani-majutsu-o-kiwamemasu-149",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/i426118.jpg?itok=9xu-bvn4",
    manga: { title: "Baki Rahen", id: "baki-rahen" },
    number: "11",
    title: "Baki Rahen 11",
    id: "baki-rahen-11",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200228044003683.jpg?itok=dEx1HfNq",
    manga: {
      title: "Perfect Secret Love: The Bad New Wife is a Little Sweet",
      id: "perfect-secret-love-bad-new-wife-little-sweet",
    },
    number: "429",
    title: "Perfect Secret Love: The Bad New Wife is a Little Sweet 429",
    id: "perfect-secret-love-bad-new-wife-little-sweet-429",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190404085931963.jpg?itok=fhGhPNZM",
    manga: { title: "Dong Gun", id: "dong-gun" },
    number: "94",
    title: "Dong Gun 94",
    id: "dong-gun-94",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190404085931963.jpg?itok=fhGhPNZM",
    manga: { title: "Dong Gun", id: "dong-gun" },
    number: "95",
    title: "Dong Gun 95",
    id: "dong-gun-95",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200830063642766.jpg?itok=SvQMxKAY",
    manga: { title: "Build Up", id: "build" },
    number: "143",
    title: "Build Up 143",
    id: "build-143",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200830063642766.jpg?itok=SvQMxKAY",
    manga: { title: "Build Up", id: "build" },
    number: "142",
    title: "Build Up 142",
    id: "build-142",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190623035553533.jpg?itok=aZz4z6N_",
    manga: { title: "Other World Warrior", id: "other-world-warrior" },
    number: "249",
    title: "Other World Warrior 249",
    id: "other-world-warrior-249",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200403122008307.jpg?itok=7h0k9T1p",
    manga: { title: "Yankee JK KuzuHana-chan", id: "yankee-jk-kuzuhana-chan" },
    number: "184",
    title: "Yankee JK KuzuHana-chan 184",
    id: "yankee-jk-kuzuhana-chan-184",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190401222517278.jpg?itok=Pn4PIEq4",
    manga: { title: "Mairimashita! Iruma-Kun", id: "mairimashita-iruma-kun" },
    number: "331",
    title: "Mairimashita! Iruma-kun 331",
    id: "mairimashita-iruma-kun-331",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200616072259361.jpg?itok=nsNh2cbP",
    manga: { title: "Blinded by the Setting Sun", id: "blinded-setting-sun" },
    number: "144",
    title: "Blinded by the Setting Sun 144",
    id: "blinded-setting-sun-144",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200530125359202.jpg?itok=zdBp_S31",
    manga: {
      title: "Dimensional Mercenary ( Other World Warrior )",
      id: "dimensional-mercenary-other-world-warrior",
    },
    number: "249",
    title: "Dimensional Mercenary ( Other World Warrior ) 249",
    id: "dimensional-mercenary-other-world-warrior-249",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20201120105025105.jpg?itok=IAw7GY7b",
    manga: { title: "Angelic Lady", id: "angelic-lady" },
    number: "149",
    title: "Angelic Lady 149",
    id: "angelic-lady-149",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "10",
    title: "Blood Parasite 10",
    id: "blood-parasite-10",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "9",
    title: "Blood Parasite 9",
    id: "blood-parasite-9",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "8",
    title: "Blood Parasite 8",
    id: "blood-parasite-8",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "7",
    title: "Blood Parasite 7",
    id: "blood-parasite-7",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "6",
    title: "Blood Parasite 6",
    id: "blood-parasite-6",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "5",
    title: "Blood Parasite 5",
    id: "blood-parasite-5",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "4",
    title: "Blood Parasite 4",
    id: "blood-parasite-4",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "3",
    title: "Blood Parasite 3",
    id: "blood-parasite-3",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "2",
    title: "Blood Parasite 2",
    id: "blood-parasite-2",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/20240111113951.png?itok=_Q5h6XEF",
    manga: { title: "Blood Parasite", id: "blood-parasite" },
    number: "1",
    title: "Blood Parasite 1",
    id: "blood-parasite-1",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190505193013492.png?itok=TecLZWzE",
    manga: { title: "Shadow House", id: "shadow-house" },
    number: "182",
    title: "Shadow House 182",
    id: "shadow-house-182",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20190402085210744.jpg?itok=sgVd0v2Q",
    manga: { title: "unOrdinary", id: "unordinary-manhwa" },
    number: "334",
    title: "unOrdinary 334",
    id: "unordinary-334",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200831134914883.jpg?itok=faBWm2eo",
    manga: { title: "Absolute Martial Arts", id: "absolute-martial-arts" },
    number: "123",
    title: "Absolute Martial Arts 123",
    id: "absolute-martial-arts-123",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20201126043545254.jpg?itok=Alo0s4Ke",
    manga: { title: "Limit Breaker", id: "limit-breaker" },
    number: "118",
    title: "Limit Breaker 118",
    id: "limit-breaker-118",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200205020104462.jpg?itok=ec1_x_5-",
    manga: { title: "I Log In Alone", id: "i-log-alone" },
    number: "178",
    title: "I Log In Alone 178",
    id: "i-log-alone-178",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200403063301898.jpg?itok=TfZltLFU",
    manga: {
      title: "Overgeared (Team Argo)",
      id: "overgeared-team-argo-manhwa",
    },
    number: "214",
    title: "Overgeared (Team Argo) 214",
    id: "overgeared-team-argo-214",
    releaseDate: expect.any(Date),
  },
  {
    image:
      "https://www.mangasaki.org/sites/default/files/styles/minicover/public/manga/cover/20200403063301898.jpg?itok=TfZltLFU",
    manga: {
      title: "Overgeared (Team Argo)",
      id: "overgeared-team-argo-manhwa",
    },
    number: "213",
    title: "Overgeared (Team Argo) 213",
    id: "overgeared-team-argo-213",
    releaseDate: expect.any(Date),
  },
];
