// document.body.style.backgroundColor = "orange";
const ArmtekLeftNavbarList = document.getElementsByClassName("navbar-nav");
// aaa[0].style.backgroundColor = "orange";
const ERPlist = document.createElement("li");
const linksList = document.createElement("li");
// const ERPpannel = document.createElement("div");
// var ClientLine = "";
// var kunnr_ag = "not_found";
// var kunnr_rg = "not_found";
// const scriptElements = document.querySelectorAll(
//   'script[type="text/javascript"]'
// );

// try {
//   ClientLine = document.getElementsByClassName("bg_client_line");
// } catch (error) {}
// // kunnr_ag
// try {
//   kunnr_ag = document
//     .getElementsByClassName("select_KUNNR_AG")[0]
//     .getAttribute("kunnr_ag");
// } catch (error) {}
// if (kunnr_ag === "not_found") {
//   try {
//     scriptElements.forEach((scriptElement) => {
//       const scriptContent = scriptElement.textContent;
//       const clientIdRegex = /clientId\s*=\s*['"]([^'"]+)['"]/;
//       const match = scriptContent.match(clientIdRegex);

//       if (match) {
//         kunnr_ag = match[1];
//       }
//     });
//   } catch (error) {}
//   if (kunnr_ag === "not_found") {
//     try {
//       const selectElements = document.querySelectorAll(".select_PARNR");

//       selectElements.forEach((selectElement) => {
//         const spanElement = selectElement.querySelector("span");
//         try {
//           kunnr_ag = spanElement.getAttribute("data-client");
//         } catch (error) {}
//       });
//     } catch (error) {}
//   }
// }
// // kunnr_rg
// try {
//   // does not work
//   // kunnr_rg = document
//   //   .getElementsByClassName("select_KUNNR_RG")[0]
//   //   .getAttribute("kunnr_rg");
// } catch (error) {}

ERPlist.innerHTML = `
  <li id="ERP"><a data-toggle="dropdown" class="dropdown-toggle" target="_self" href="#" title="ERP">
  <div class="menu_icon">
  <div id="ERPcaret">ERP<b class="caret"></b></div></a>
    <ul class="dropdown-menu">
      <li><a target="_self" href="/tool_refresh_sessions"><span>Сбросить кеш</span></a></li>
      <li><a target="_self" href="/reports/reports_orders/by_numbers"><span>Поиск по номеру документа</span></a></li>
      <li><a target="_self" href="/payment2/bankCallsReport"><span>Проверка платежа</span></a></li>
    </ul>
  </li>
  `;
linksList.innerHTML = `
  <li id="links"><a data-toggle="dropdown" class="dropdown-toggle" target="_self" href="#" title="links">
    <div class="menu_icon">
    <div id="linksCaret">Ссылки<b class="caret"></b></div></a>
    <ul class="dropdown-menu">
      <li><a target="blank" href="http://portal/view_doc.html"><span>Портал</span></a></li>
      <li><a target="blank" href="http://portal/view_doc.html?mode=doc_type&object_id=5916115003867543517&doc_id=&tab=1"><span>Портал (поиск по ФИО)</span></a></li>
      <li><a target="blank" href="http://ws.armtek.ru"><span>Веб-сервис</span></a></li>
      <li><a target="blank" href="https://diadoc.kontur.ru"><span>Диадок</span></a></li>
      <li><a target="blank" href="https://pay.raif.ru/account/#/auth"><span>Райффайзен</span></a></li>
      <li><a target="blank" href="http://erp.itportal.corp/index.php"><span>Вики</span></a></li>
      <li class="divider"></li>
      <li><a target="blank" href="http://crm.armtek.ru/ru/crm"><span>РММ</span></a></li>
      <li><a target="blank" href="http://logist.mmb.armtek.by/site/login"><span>РМЭ</span></a></li>
      <li><a target="blank" href="https://pcm.armtek.ru/main-page"><span>РСМ</span></a></li>
      <li><a target="blank" href="https://etp.armtek.by/monitors/V2?monitorid=71"><span>Клиентский монитор</span></a></li>
      <li class="divider"></li>
      <li><a target="blank" href="http://q-store.uk.armtek.local"><span>Тестовый ЭТП</span></a></li>
      <li><a target="blank" href="http://crmtest.uk.armtek.local/ru/auth/login"><span>Тестовый РММ</span></a></li>
      <li><a target="blank" href="http://ws-test.uk.armtek.local"><span>Тестовый веб-сервис</span></a></li>

    </ul>
  </li> 
  `;
ArmtekLeftNavbarList[0].appendChild(ERPlist);
ArmtekLeftNavbarList[0].appendChild(linksList);

// ERPpannel.innerHTML = `
//   <nav class="navbar">
//     <div>AG: ${kunnr_ag}</div>
//     <div>RG: ${kunnr_rg}</div>
//   </nav>`;
// ClientLine[0].appendChild(ERPpannel);
