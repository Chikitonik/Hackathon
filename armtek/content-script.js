const ArmtekLeftNavbarList = document.getElementsByClassName("navbar-nav");
const ERPlist = document.createElement("li");
const linksList = document.createElement("li");

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
      <li><a target="blank" href="https://lks.corp"><span>Личн каб сотрудника</span></a></li>
      <li><a target="blank" href="http://armtek.ru"><span>Розничный магазин</span></a></li>
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
      <li><a target="blank" href="https://xwz.armtek.ru"><span>Тестовый розница на EUQ</span></a></li>
      <li><a target="blank" href="https://betashop.armtek.ru"><span>Тестовый розница на EUP</span></a></li>
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
