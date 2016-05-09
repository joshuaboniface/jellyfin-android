define(["libraryBrowser","scripts/alphapicker","scrollStyles"],function(e){return function(t,r){function a(){return"Thumb"}function s(){return"Poster"}function n(){Dashboard.showLoadingMsg(),d(),i()}function i(){var r=AppInfo.hasLowImageBandwidth?16:24,s={Limit:r,Fields:"PrimaryImageAspectRatio,SeriesInfo,DateCreated,SyncInfo",UserId:Dashboard.getCurrentUserId(),ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};s.ParentId=LibraryMenu.getTopParentId(),ApiClient.getNextUpEpisodes(s).then(function(r){r.Items.length?t.querySelector(".noNextUpItems").classList.add("hide"):t.querySelector(".noNextUpItems").classList.remove("hide");var s=a(),n="";"ThumbCard"==s?n+=e.getPosterViewHtml({items:r.Items,shape:"backdrop",showTitle:!0,preferThumb:!0,showParentTitle:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}):"Thumb"==s&&(n+=e.getPosterViewHtml({items:r.Items,shape:"backdrop",showTitle:!0,showParentTitle:!0,overlayText:!1,lazy:!0,preferThumb:!0,showDetailsMenu:!0,centerText:!0,overlayPlayButton:AppInfo.enableAppLayouts}));var i=t.querySelector("#nextUpItems");i.innerHTML=n,ImageLoader.lazyChildren(i),Dashboard.hideLoadingMsg()})}function o(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function l(){return o()?"overflowBackdrop":"backdrop"}function d(){var r=LibraryMenu.getTopParentId(),a=6,n={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Episode",Filters:"IsResumable",Limit:a,Recursive:!0,Fields:"PrimaryImageAspectRatio,SeriesInfo,UserData,SyncInfo",ExcludeLocationTypes:"Virtual",ParentId:r,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:0};ApiClient.getItems(Dashboard.getCurrentUserId(),n).then(function(r){r.Items.length?t.querySelector("#resumableSection").classList.remove("hide"):t.querySelector("#resumableSection").classList.add("hide");var a=s(),n="";"PosterCard"==a?n+=e.getPosterViewHtml({items:r.Items,shape:l(),showTitle:!0,showParentTitle:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0,preferThumb:!0}):"Poster"==a&&(n+=e.getPosterViewHtml({items:r.Items,shape:l(),showTitle:!0,showParentTitle:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0,preferThumb:!0,centerText:!0}));var i=t.querySelector("#resumableItems");i.innerHTML=n,ImageLoader.lazyChildren(i)})}function c(e,a){var s=e.querySelector(".pageTabContent[data-index='"+a+"']"),n=[];switch(a){case 0:break;case 1:n.push("scripts/tvlatest");break;case 2:n.push("scripts/tvupcoming");break;case 3:n.push("scripts/tvshows");break;case 4:n.push("scripts/episodes");break;case 5:n.push("scripts/tvgenres");break;case 6:n.push("scripts/tvstudios")}require(n,function(e){0==a&&(p.tabContent=s);var n=m[a];n||(n=a?new e(t,r,s):p,m[a]=n,n.initTab&&n.initTab()),-1==b.indexOf(a)&&(b.push(a),n.renderTab())})}function u(r,a){if(a.NowPlayingItem&&"Video"==a.NowPlayingItem.MediaType){var s=t.querySelector(".pageTabsContainer");s.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:e.selectedTab(s)}}))}}var p=this;p.initTab=function(){var t=p.tabContent;o()?t.querySelector("#resumableItems").classList.add("hiddenScrollX"):t.querySelector("#resumableItems").classList.remove("hiddenScrollX"),e.createCardMenus(t.querySelector("#resumableItems"))},p.renderTab=function(){n()};var m=[],b=[],h=t.querySelector(".pageTabsContainer"),y="tv.html",I=r.topParentId;I&&(y+="?topParentId="+I),o()?t.querySelector("#resumableItems").classList.add("hiddenScrollX"):t.querySelector("#resumableItems").classList.remove("hiddenScrollX"),e.createCardMenus(t.querySelector("#resumableItems")),e.configurePaperLibraryTabs(t,t.querySelector("paper-tabs"),h,y),h.addEventListener("tabchange",function(e){c(t,parseInt(e.detail.selectedTabIndex))}),t.addEventListener("viewbeforeshow",function(){if(!t.getAttribute("data-title")){var e=r.topParentId;e?ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){t.setAttribute("data-title",e.Name),LibraryMenu.setTitle(e.Name)}):(t.setAttribute("data-title",Globalize.translate("TabShows")),LibraryMenu.setTitle(Globalize.translate("TabShows")))}Events.on(MediaController,"playbackstop",u)}),t.addEventListener("viewbeforehide",function(){Events.off(MediaController,"playbackstop",u)}),t.addEventListener("viewdestroy",function(){m.forEach(function(e){e.destroy&&e.destroy()})})}});