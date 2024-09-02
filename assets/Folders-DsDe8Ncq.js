import{r as o,j as e,c as G,T as J,f as j,u as oe,I,B as le}from"./index-Ck7621Tc.js";import{u as z,o as T,b as ae,C as Q,T as B,f as re,I as ie,P as ce,s as de,S as ue,A as fe,R as me,a as _e}from"./sortItems-iTEZoTFa.js";import{b as be,g as he,c as pe,_ as L,e as O,d as xe,f as q,h as ge,i as ve,u as R,a as F}from"./useAppSelector.hook-Djmn2zyC.js";import{u as Se}from"./useTimeout-BM8AyNJZ.js";import{I as Ce,C as ye,a as Ee}from"./InteractiveListItem-dfaFc_jS.js";function U(m){return m.substring(2).toLowerCase()}function je(m,l){return l.documentElement.clientWidth<m.clientX||l.documentElement.clientHeight<m.clientY}function W(m){const{children:l,disableReactTree:b=!1,mouseEvent:a="onClick",onClickAway:d,touchEvent:h="onTouchEnd"}=m,p=o.useRef(!1),c=o.useRef(null),x=o.useRef(!1),S=o.useRef(!1);o.useEffect(()=>(setTimeout(()=>{x.current=!0},0),()=>{x.current=!1}),[]);const g=be(l.ref,c),i=z(n=>{const u=S.current;S.current=!1;const _=T(c.current);if(!x.current||!c.current||"clientX"in n&&je(n,_))return;if(p.current){p.current=!1;return}let r;n.composedPath?r=n.composedPath().indexOf(c.current)>-1:r=!_.documentElement.contains(n.target)||c.current.contains(n.target),!r&&(b||!u)&&d(n)}),v=n=>u=>{S.current=!0;const _=l.props[n];_&&_(u)},s={ref:g};return h!==!1&&(s[h]=v(h)),o.useEffect(()=>{if(h!==!1){const n=U(h),u=T(c.current),_=()=>{p.current=!0};return u.addEventListener(n,i),u.addEventListener("touchmove",_),()=>{u.removeEventListener(n,i),u.removeEventListener("touchmove",_)}}},[i,h]),a!==!1&&(s[a]=v(a)),o.useEffect(()=>{if(a!==!1){const n=U(a),u=T(c.current);return u.addEventListener(n,i),()=>{u.removeEventListener(n,i)}}},[i,a]),e.jsx(o.Fragment,{children:o.cloneElement(l,s)})}const V="Snackbar";function ke(m){return he(V,m)}pe(V,["root"]);function Fe(m={}){const{autoHideDuration:l=null,disableWindowBlurListener:b=!1,onClose:a,open:d,resumeHideDuration:h}=m,p=Se();o.useEffect(()=>{if(!d)return;function r(t){t.defaultPrevented||(t.key==="Escape"||t.key==="Esc")&&(a==null||a(t,"escapeKeyDown"))}return document.addEventListener("keydown",r),()=>{document.removeEventListener("keydown",r)}},[d,a]);const c=z((r,t)=>{a==null||a(r,t)}),x=z(r=>{!a||r==null||p.start(r,()=>{c(null,"timeout")})});o.useEffect(()=>(d&&x(l),p.clear),[d,l,x,p]);const S=r=>{a==null||a(r,"clickaway")},g=p.clear,i=o.useCallback(()=>{l!=null&&x(h??l*.5)},[l,h,x]),v=r=>t=>{const C=r.onBlur;C==null||C(t),i()},s=r=>t=>{const C=r.onFocus;C==null||C(t),g()},n=r=>t=>{const C=r.onMouseEnter;C==null||C(t),g()},u=r=>t=>{const C=r.onMouseLeave;C==null||C(t),i()};return o.useEffect(()=>{if(!b&&d)return window.addEventListener("focus",i),window.addEventListener("blur",g),()=>{window.removeEventListener("focus",i),window.removeEventListener("blur",g)}},[b,d,i,g]),{getRootProps:(r={})=>{const t=L({},O(m),O(r));return L({role:"presentation"},r,t,{onBlur:v(t),onFocus:s(t),onMouseEnter:n(t),onMouseLeave:u(t)})},onClickAway:S}}const Ne=["autoHideDuration","children","disableWindowBlurListener","exited","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","slotProps","slots"],Pe=()=>ge({root:["root"]},ve(ke)),we=o.forwardRef(function(l,b){const{autoHideDuration:a=null,children:d,disableWindowBlurListener:h=!1,exited:p=!0,onClose:c,open:x,resumeHideDuration:S,slotProps:g={},slots:i={}}=l,v=xe(l,Ne),s=Pe(),{getRootProps:n,onClickAway:u}=Fe(L({},l,{autoHideDuration:a,disableWindowBlurListener:h,onClose:c,open:x,resumeHideDuration:S})),_=l,r=i.root||"div",t=q({elementType:r,getSlotProps:n,externalForwardedProps:v,externalSlotProps:g.root,additionalProps:{ref:b},ownerState:_,className:s.root}),C=q({elementType:W,externalSlotProps:g.clickAwayListener,additionalProps:{onClickAway:u},ownerState:_});return delete C.ownerState,!x&&p?null:e.jsx(W,L({},C,{children:e.jsx(r,L({},t,{children:d}))}))}),Le="_slideIn_1l0ot_1",$={"visually-hidden":"_visually-hidden_1l0ot_1","custom-snackbar":"_custom-snackbar_1l0ot_24",slideIn:Le,"custom-snackbar__close-button":"_custom-snackbar__close-button_1l0ot_40"};function Z({open:m,handleClose:l,className:b,children:a,autoHideDuration:d=2e3}){return e.jsxs(we,{autoHideDuration:d,open:m,onClose:l,className:G($["custom-snackbar"],b),children:[e.jsx("span",{children:a}),e.jsx("button",{onClick:l,className:$["custom-snackbar__close-button"],children:e.jsx(ae,{width:"20px",height:"20px"})})]})}const A={"visually-hidden":"_visually-hidden_zbg9n_1","modal-form":"_modal-form_zbg9n_14","modal-buttons":"_modal-buttons_zbg9n_19","modal-buttons__button":"_modal-buttons__button_zbg9n_30"},K="create-folder-modal-title";function Re({modalState:m,setModalState:l}){const b=R(),a=F(n=>n.folders),d=o.useRef(null),[h,p]=o.useState(!1),[c,x]=o.useState(""),[S,g]=o.useState(!0);o.useEffect(()=>{g(c==="")},[c]);const i=()=>{var n;p(!1),(n=d.current)==null||n.focus()},v=()=>{l(!1)},s=n=>{n.preventDefault();const u=!!a.items.find(_=>_.name===c);if(u){p(u);return}b(j.add({id:new Date().getTime(),name:c,notes:[]})),v()};return e.jsx(Q,{open:m,onClose:v,"aria-labelledby":K,children:e.jsxs("div",{children:[e.jsxs("form",{onSubmit:s,className:A["modal-form"],children:[e.jsx("h2",{id:K,className:"visually-hidden",children:"Создать папку заметок"}),e.jsx(J,{ref:d,name:"folder-name",placeholder:"Название папки",onChange:n=>x(n.target.value)}),e.jsxs("div",{className:A["modal-buttons"],children:[e.jsx(B,{type:"button",onClick:v,className:A["modal-buttons__button"],children:"Отмена"}),e.jsx(B,{type:"submit",className:A["modal-buttons__button"],disabled:S,children:"Создать"})]})]}),e.jsx(Z,{open:h,handleClose:i,children:"Папка с таким именем уже существует"})]})})}const N={"visually-hidden":"_visually-hidden_hzc59_1","editable-folder__note-count":"_editable-folder__note-count_hzc59_14","editable-folder__date":"_editable-folder__date_hzc59_14","editable-folder__title":"_editable-folder__title_hzc59_28","editable-folder":"_editable-folder_hzc59_14","editable-folder__text":"_editable-folder__text_hzc59_74","editable-folder__pin":"_editable-folder__pin_hzc59_96"};function X({contextMenuItems:m,children:l,data:b,isSelectable:a=!0,isSelection:d=!1,className:h,...p}){const c=R(),S=F(g=>g.settings).sort==="createDate"?b.createdAt:b.updatedAt;return e.jsxs(Ce,{...p,contextMenuItems:m,isSelection:d,className:G(N["editable-folder"],h),children:[a&&d&&e.jsx(ye,{name:"folder-select",className:N["editable-folder__select-checkbox"],appearance:"circle",checked:b.selected,tabIndex:-1,onChange:()=>c(j.toggleSelect(b.id))}),e.jsxs("div",{className:N["editable-folder__text"],children:[e.jsx("span",{className:N["editable-folder__title"],children:l}),e.jsxs("span",{className:N["editable-folder__note-count"],children:["Количество заметок: ",b.notes.length]}),e.jsx("span",{"aria-hidden":!0,className:N["editable-folder__date"],children:re(ie(S))}),b.pinned.state&&e.jsx(ce,{className:N["editable-folder__pin"]})]})]})}const M={"visually-hidden":"_visually-hidden_zbg9n_1","modal-form":"_modal-form_zbg9n_14","modal-buttons":"_modal-buttons_zbg9n_19","modal-buttons__button":"_modal-buttons__button_zbg9n_30"},Y="rename-folder-modal-title";function Ae({id:m,name:l,modalState:b,setModalState:a,confirmAction:d}){const h=R(),p=F(t=>t.folders),c=F(t=>t.settings),x=o.useRef(null),[S,g]=o.useState(!1),[i,v]=o.useState(l),[s,n]=o.useState(!0);o.useEffect(()=>{v(l)},[l]),o.useEffect(()=>{n(i==="")},[i]);const u=()=>{var t;g(!1),(t=x.current)==null||t.focus()},_=t=>{t.stopPropagation(),a(!1)},r=t=>{if(t.preventDefault(),i===l){a(!1);return}const C=!!p.items.find(D=>D.name===i);if(C){g(C);return}c.actionConfirmations==="all"?d({message:"Подтвердить изменения",onConfirm:P}):P(),a(!1);function P(){h(j.rename({id:m,name:i}))}};return e.jsx(Q,{open:b,onClose:_,"aria-labelledby":Y,children:e.jsxs("div",{children:[e.jsxs("form",{onSubmit:r,className:M["modal-form"],children:[e.jsx("h2",{id:Y,className:"visually-hidden",children:"Переименовать папку заметок"}),e.jsx(J,{ref:x,name:"new-folder-name",placeholder:"Название папки",value:i,onFocus:t=>t.stopPropagation(),onChange:t=>v(t.target.value)}),e.jsxs("div",{className:M["modal-buttons"],children:[e.jsx(B,{type:"button",onFocus:t=>t.stopPropagation(),onClick:_,className:M["modal-buttons__button"],children:"Отмена"}),e.jsx(B,{type:"submit",className:M["modal-buttons__button"],disabled:s,onFocus:t=>t.stopPropagation(),children:"Переименовать"})]})]}),e.jsx(Z,{open:S,handleClose:u,children:"Папка с таким именем уже существует"})]})})}const Me={"visually-hidden":"_visually-hidden_uqvm3_1","folders-list":"_folders-list_uqvm3_14"};function Be({isSelection:m,confirmAction:l}){const[b,a]=o.useState(!1),[d,h]=o.useState(),p=R(),c=F(s=>s.folders),x=F(s=>s.settings),S=c.items.find(s=>s.id===1),g=de(c.items.filter(s=>s.id!==1),x.sort,!0).filter(s=>s.id!==1),i=s=>{h({id:s.id,name:s.name}),a(!0)},v=s=>{const n=s.selected?"Снять выделение":"Выделить",u=s.pinned.state?"Открепить":"Закрепить";return[{name:n,action:()=>p(j.toggleSelect(s.id))},{name:u,action:()=>p(j.togglePin(s.id))},{name:"Переименовать",action:()=>{h({id:s.id,name:s.name}),a(!0)}},{name:"Удалить",action:()=>i(s)}]};return e.jsxs(e.Fragment,{children:[e.jsxs(Ee,{className:Me["folders-list"],children:[e.jsx(X,{data:S,isSelection:m,isSelectable:!1,children:S.name},S.id),g.map(s=>e.jsx(X,{contextMenuItems:v(s),data:s,isSelection:m,onClick:()=>i(s),onKeyDown:n=>n.key==="Enter"&&i(s),children:s.name},s.id))]}),d&&e.jsx(Ae,{modalState:b,setModalState:a,confirmAction:l,id:d.id,name:d.name})]})}const De="_folders__content_q6rnf_14",Ie="_folders__sidebar_q6rnf_42",Te="_folders__buttons_q6rnf_69",ze="_folders__title_q6rnf_75",He="_folders_q6rnf_14",Oe="_folders__header_q6rnf_103",k={"visually-hidden":"_visually-hidden_q6rnf_1",folders__content:De,folders__sidebar:Ie,folders__buttons:Te,folders__title:ze,folders:He,folders__header:Oe,"folders__add-button":"_folders__add-button_q6rnf_126","folders__remove-button":"_folders__remove-button_q6rnf_126"};function Xe(){const[m,l]=o.useState(!1),[b,a]=o.useState({message:"",onConfirm:()=>{}}),[d,h]=o.useState(!1),[p,c]=o.useState(!1),[x,S]=o.useState(!1),[g,i]=o.useState(!1),[v,s]=o.useState(!1),n=o.useRef(null),u=R(),_=F(f=>f.folders),r=F(f=>f.settings),t=oe();o.useEffect(()=>{v&&n.current&&n.current.focus()},[v,n]),o.useEffect(()=>{if(_.items.find(y=>y.selected)){s(!0),h(!0);const y=_.items.filter(E=>E.selected),w=y.find(E=>E.pinned.state)&&y.find(E=>!E.pinned.state),se=y.filter(E=>E.pinned.state).length===y.length,ne=y.filter(E=>!E.pinned.state).length===y.length;_.items.filter(E=>E.id!==1).find(E=>!E.selected)?c(!1):c(!0),ne||w?S(!0):se&&S(!1)}else h(!1),S(!0);const f=y=>{y.key==="Escape"&&H()};return document.addEventListener("keydown",f),()=>{document.removeEventListener("keydown",f)}},[_.items]);const C=()=>{i(!0)},P=({message:f,onConfirm:y})=>{a({message:f,onConfirm:y}),l(!0)},D=()=>{r.actionConfirmations==="all"||r.actionConfirmations==="deleteOnly"?P({message:"Подтвердить удаление",onConfirm:f}):f();function f(){_.items.filter(w=>w.selected).forEach(w=>{u(j.remove(w.id))})}},H=()=>{_.items.filter(f=>f.selected&&f.id!==1).forEach(f=>{u(j.toggleSelect(f.id))}),c(!1),s(!1)},ee=()=>{_.items.filter(f=>f.selected===p&&f.id!==1).forEach(f=>{u(j.toggleSelect(f.id))}),c(f=>!f)},te=()=>{_.items.forEach(f=>{f.selected&&(x&&!f.pinned.state||!x)&&u(j.togglePin(f.id))})};return e.jsxs("div",{className:k.folders,children:[e.jsxs("div",{className:k.folders__header,children:[e.jsx(I,{"aria-label":"Вернуться к заметкам",iconType:"stroke",onClick:()=>t(-1),tabIndex:v?-1:0,children:e.jsx(le,{})}),e.jsx("h2",{className:k.folders__title,children:"Папки"})]}),e.jsxs("div",{className:k.folders__content,children:[v&&e.jsx(ue,{className:k.folders__sidebar,closeSidebar:{exist:!0,action:H,ref:n},toggleSelectState:{exist:!0,action:ee,selectAllButtonState:p},togglePinState:{exist:!0,action:te,disabled:!d,pinAllButtonState:x},changeFolder:{exist:!1}}),e.jsx(Be,{isSelection:v,confirmAction:P})]}),e.jsx("div",{className:k.folders__buttons,children:v?e.jsx(I,{"aria-label":"Удалить выделенные папки",appearance:"circle",colorScheme:"primary",className:k["folders__remove-button"],onClick:D,disabled:!d,children:e.jsx(me,{})}):e.jsx(I,{"aria-label":"Создать папку",appearance:"circle",colorScheme:"primary",className:k["folders__add-button"],onClick:C,children:e.jsx(fe,{})})}),e.jsx(Re,{modalState:g,setModalState:i}),r.actionConfirmations!=="none"&&e.jsx(_e,{message:b.message,modalState:m,onConfirm:b.onConfirm,setModalState:l})]})}export{Xe as default};