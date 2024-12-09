# Binary operators in Aya

We have designed a binary operator system in Aya which happens to be \(we didn't copy!\) very similar to
[Rhombus](https://plt.cs.northwestern.edu/pkg-build/doc/enforest/Operator_Precedence_and_Associativity.html) \(a.k.a. Racket 2\)
and [Swift 5.7](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID550).


TL\;DR: it supports making _any_ identifier a custom operator
with precedences specified by a partial ordering.
Left and right associativities are supported in addition to that.


The precedence and associativity information is bound to a
name, not a definition. This means we can import a name from
another module with changes to its name, associativity, and precedence.
Importing with renaming is an established feature, but changing associativity
and precedence is not that popular \(though implemented in Agda already\).


Here are some code examples \(implementations are omitted for simplicity\):

<pre class="Aya">
<code><span class="Comment">// Left-associative</span>
<span class="Keyword">def</span> <span class="Keyword">infixl</span> <a id="Mian-2b" class="aya-hover" aya-hover-text="Nat" href="#Mian-2b"><span class="Fn">+</span></a> (<a id="v1353530305" class="aya-hover" aya-hover-text="Nat" href="#v1353530305"><span class="LocalVar">x</span></a> <a id="v574268151" class="aya-hover" aya-hover-text="Nat" href="#v574268151"><span class="LocalVar">y</span></a> : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a>) : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a> ⇒ <span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+R29hbDogR29hbCBvZiB0eXBlCiAgICAgICAgPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4KICAgICAgICAoTm9ybWFsaXplZDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4pCiAgICAgIENvbnRleHQ6CiAgICAgICAgPGEgaHJlZj0iI3YxMzUzNTMwMzA1Ij48c3BhbiBjbGFzcz0iTG9jYWxWYXIiPng8L3NwYW4+PC9hPiA6IDxhIGhyZWY9IiNNaWFuLU5hdCI+PHNwYW4gY2xhc3M9IkRhdGEiPk5hdDwvc3Bhbj48L2E+CiAgICAgICAgPGEgaHJlZj0iI3Y1NzQyNjgxNTEiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eTwvc3Bhbj48L2E+IDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT48L2NvZGU+CjwvcHJlPgo="><span class="Goal"><span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+PHNwYW4gY2xhc3M9IkNhbGwiPj88YSBocmVmPSIjdjEyMTIxMTYzNDMiPl8wPC9hPiA8YSBocmVmPSIjdjEzNTM1MzAzMDUiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eDwvc3Bhbj48L2E+IDxhIGhyZWY9IiN2NTc0MjY4MTUxIj48c3BhbiBjbGFzcz0iTG9jYWxWYXIiPnk8L3NwYW4+PC9hPjwvc3Bhbj48L2NvZGU+CjwvcHJlPgo=">{??}</span></span></span>
<span class="Comment">// Left-associative, bind tighter than +</span>
<span class="Keyword">def</span> <span class="Keyword">infixl</span> <a id="Mian-2a" class="aya-hover" aya-hover-text="Nat" href="#Mian-2a"><span class="Fn">*</span></a> (<a id="v1740846921" class="aya-hover" aya-hover-text="Nat" href="#v1740846921"><span class="LocalVar">x</span></a> <a id="v263885523" class="aya-hover" aya-hover-text="Nat" href="#v263885523"><span class="LocalVar">y</span></a> : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a>) : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a> ⇒ <span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+R29hbDogR29hbCBvZiB0eXBlCiAgICAgICAgPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4KICAgICAgICAoTm9ybWFsaXplZDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4pCiAgICAgIENvbnRleHQ6CiAgICAgICAgPGEgaHJlZj0iI3YxNzQwODQ2OTIxIj48c3BhbiBjbGFzcz0iTG9jYWxWYXIiPng8L3NwYW4+PC9hPiA6IDxhIGhyZWY9IiNNaWFuLU5hdCI+PHNwYW4gY2xhc3M9IkRhdGEiPk5hdDwvc3Bhbj48L2E+CiAgICAgICAgPGEgaHJlZj0iI3YyNjM4ODU1MjMiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eTwvc3Bhbj48L2E+IDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT48L2NvZGU+CjwvcHJlPgo="><span class="Goal"><span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+PHNwYW4gY2xhc3M9IkNhbGwiPj88YSBocmVmPSIjdjE3MTQxMTM2NDEiPl8wPC9hPiA8YSBocmVmPSIjdjE3NDA4NDY5MjEiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eDwvc3Bhbj48L2E+IDxhIGhyZWY9IiN2MjYzODg1NTIzIj48c3BhbiBjbGFzcz0iTG9jYWxWYXIiPnk8L3NwYW4+PC9hPjwvc3Bhbj48L2NvZGU+CjwvcHJlPgo=">{??}</span></span></span> <span class="Keyword">tighter</span> <a class="aya-hover" aya-hover-text="Nat" href="#Mian-2b"><span class="Fn">+</span></a>
<span class="Comment">// Prefix operator</span>
<span class="Keyword">def</span> <span class="Keyword">fixl</span> <a id="Mian-21" class="aya-hover" aya-hover-text="Nat" href="#Mian-21"><span class="Fn">!</span></a> (<a id="v262445056" class="aya-hover" aya-hover-text="Nat" href="#v262445056"><span class="LocalVar">x</span></a> : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a>) : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a> ⇒ <span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+R29hbDogR29hbCBvZiB0eXBlCiAgICAgICAgPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4KICAgICAgICAoTm9ybWFsaXplZDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4pCiAgICAgIENvbnRleHQ6CiAgICAgICAgPGEgaHJlZj0iI3YyNjI0NDUwNTYiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eDwvc3Bhbj48L2E+IDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT48L2NvZGU+CjwvcHJlPgo="><span class="Goal"><span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+PHNwYW4gY2xhc3M9IkNhbGwiPj88YSBocmVmPSIjdjE4OTgxNTU5NzAiPl82PC9hPiA8YSBocmVmPSIjdjI2MjQ0NTA1NiI+PHNwYW4gY2xhc3M9IkxvY2FsVmFyIj54PC9zcGFuPjwvYT48L3NwYW4+PC9jb2RlPgo8L3ByZT4K">{??}</span></span></span>
<span class="Comment">// Postfix operator</span>
<span class="Keyword">def</span> <span class="Keyword">fixr</span> <a id="Mian-3f" class="aya-hover" aya-hover-text="Nat" href="#Mian-3f"><span class="Fn">?</span></a> (<a id="v710190911" class="aya-hover" aya-hover-text="Nat" href="#v710190911"><span class="LocalVar">x</span></a> : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a>) : <a class="aya-hover" aya-hover-text="Type 0" href="#Mian-Nat"><span class="Data">Nat</span></a> ⇒ <span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+R29hbDogR29hbCBvZiB0eXBlCiAgICAgICAgPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4KICAgICAgICAoTm9ybWFsaXplZDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT4pCiAgICAgIENvbnRleHQ6CiAgICAgICAgPGEgaHJlZj0iI3Y3MTAxOTA5MTEiPjxzcGFuIGNsYXNzPSJMb2NhbFZhciI+eDwvc3Bhbj48L2E+IDogPGEgaHJlZj0iI01pYW4tTmF0Ij48c3BhbiBjbGFzcz0iRGF0YSI+TmF0PC9zcGFuPjwvYT48L2NvZGU+CjwvcHJlPgo="><span class="Goal"><span class="aya-tooltip" data-tooltip-text="PHByZSBjbGFzcz0iQXlhIj4KPGNvZGU+PHNwYW4gY2xhc3M9IkNhbGwiPj88YSBocmVmPSIjdjM3OTY0NTQ2NCI+XzE8L2E+IDxhIGhyZWY9IiN2NzEwMTkwOTExIj48c3BhbiBjbGFzcz0iTG9jYWxWYXIiPng8L3NwYW4+PC9hPjwvc3Bhbj48L2NvZGU+CjwvcHJlPgo=">{??}</span></span></span></code>
</pre>

The `tighter` keyword works like this: when there are expressions like
`a * b + c` which may either mean `(a * b) + c` or `a * (b + c)`,
we will put the tighter operator in the parenthesis.
In case we found the two operators share the same priority, Aya will report an error.


With imports, it looks like this:

```
open import Primitives using (
  invol       as fixl  ~  tighter =, \/, /\,
  intervalMin as infix /\ tighter \/,
  intervalMax as infix \/,
)
```

Specifying precedence of operators with a partial ordering is way better than with a number.
In Haskell, if we already have `infix 3 +` and `infix 4 *`, and we hope to add a new operator
which has higher precedence than `+` but lower than `*`, it's going to be impossible.
Agda introduced [float-point precedence](https://github.com/agda/agda/issues/3991)
levels to address the issue, but I think it does not solve the essential problem:
that I have to lookup the numbers \(of existing operator precedences\)
every time I write a new operator.


In the future, we plan to support mixfix operators as in Agda
\(the current framework can support mixfix easily, but abusing mixfix notations can harm readability\).

<style>
/*
 * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
 * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
 */


/*
 * Styles for links (terms in Aya are compiled to links) inside Aya code block:
 * no decorations, but uses decorations styles from parent if set
 * (useful if the term contains error or warning).
 */
.Aya a {
  text-decoration-line: none;
  text-decoration-color: inherit;
  text-underline-position: inherit;
}
.Aya a:hover {
  text-decoration-line: none;
  text-decoration-color: inherit;
  text-underline-position: inherit;
}

/*
 * When hovering over a link (term), highlight the link (term) with a background color.
 * This is used for highlighting all occurrences of a term.
 */
:root {
  --Doc-Term-Highlight-BackgroundColor: #B4EEB4;
}

.Aya a[href]:hover {
  background-color: var(--Doc-Term-Highlight-BackgroundColor);
}
.Aya [href].hover-highlight {
  background-color: var(--Doc-Term-Highlight-BackgroundColor);
}
</style>
<style>
/*
 * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
 * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
 */

/*
 * Aya's Doc framework supports two popup kinds:
 * (1) Hover (used in code: `Doc.HyperLinked`): shows extra information (in code: `String`) on hover. The hover is implemented in pure CSS.
 *     Pros: it can be rendered correctly in more places, (like some markdown renderers don't support JavaScript).
 *     Cons: the popup content is not clickable, selectable, or copyable. Users cannot interact with the popup.
 * (2) Tooltip (used in code: `Doc.Tooltip`): show a separate document (in code: `Doc`) on hover. The tooltip is implemented in JavaScript.
 *     Pros: support everything that a normal HTML document can do, e.g. clicks, selections, copy-paste.
 *     Cons: if the renderer doesn't support JavaScript, so the tooltip won't be rendered.
 */

/* for `Doc.HyperLinked`, which is used to show the type of a term on hover. */

/* Default colors used in `HyperLinked` hover */
:root {
  --Doc-Hover-BackgroundColor: rgba(18, 26, 44, 0.8);
  --Doc-Hover-TextColor: #fff;
  --Doc-Hover-BoxShadowColor: rgba(0, 0, 0, 0.1);
}

.Aya .aya-hover {
  /* make absolute position available for hover popup */
  position: relative;
  cursor: pointer;
}

.Aya [aya-hover-text]:after {
  /* hover text */
  content: attr(aya-hover-text);
  visibility: hidden;
  /* above the text, aligned to left */
  position: absolute;
  top: 0;
  left: 0; /* 0% for left-aligned, 100% for right-aligned*/
  transform: translate(0px, -110%);
  /* spacing */
  white-space: pre;
  padding: 5px 10px;
  background-color: var(--Doc-Hover-BackgroundColor);
  color: var(--Doc-Hover-TextColor);
  box-shadow: 1px 1px 14px var(--Doc-Hover-BoxShadowColor);
}

.Aya .aya-hover:hover:after {
  /* show on hover */
  transform: translate(0px, -110%);
  visibility: visible;
  display: block;
}

/* for `Doc.Tooltip`, which is usually used for error messages. */
/* Default colors used in tooltip */
:root {
  --Doc-Tooltip-BackgroundColor: #f6f6f7;
  --Doc-Tooltip-TextColor: #3c3c43;
  --Doc-Tooltip-BoxShadowColor: rgba(0, 0, 255, .2);
  --Doc-Tooltip-BorderColor: #333;
}

.AyaTooltipPopup {
  /* floating on the page */
  position: absolute;
  z-index: 100;
  /* font style */
  font-size: 0.85em;
  /* spacing */
  padding: 4px 8px;
  background-color: var(--Doc-Tooltip-BackgroundColor);
  color: var(--Doc-Tooltip-TextColor);
  box-shadow: 1px 1px 20px 1px var(--Doc-Tooltip-BoxShadowColor);
  border: 2px solid var(--Doc-Tooltip-BorderColor);
}

.AyaTooltipPopup #AyaTooltipPopupClose {
  float: right;
  display: inline-block;
  padding: 0 5px;
  margin: -4px -8px; /* ignore the parent padding */
  visibility: hidden;
  background-color: var(--Doc-Tooltip-BackgroundColor);
}

.AyaTooltipPopup #AyaTooltipPopupClose:hover {
  color: red;
}
</style>
<script>
export default {
  mounted() {
/*
 * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
 * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
 */

// When we hover over an Agda identifier, we highlight all occurrences of this identifier on the page.
// To this end, we create a map from identifier to all of its occurrences in the beginning.

// A dictionary from hrefs to 'a'-elements that have this href.
const dict = new Map();

function highlightFn(root) {
  // Get all 'a' tags with an 'href' attribute.
  // We call those "objects".
  const objs = root.querySelectorAll('a[href]');

  // Build a dictionary mapping a href to a set of objects that have this href.
  for (const obj of objs) {
    const key = obj.href;
    const set = dict.get(key) ?? new Set();
    set.add(obj);
    dict.set(key, set);
  }

  // Install 'onmouseover' and 'onmouseout' event handlers for all objects.
  for (const obj of objs) {
    // 'onmouseover' for an object adds attribute 'hover-highlight' to all objects with the same href.
    obj.onmouseover = function () {
      for (const o of dict.get(this.href)) {
        o.classList.add('hover-highlight');
      }
    }
    // 'onmouseover' removes the added 'hover-highlight' attributes again.
    obj.onmouseout = function () {
      for (const o of dict.get(this.href)) {
        o.classList.remove('hover-highlight');
      }
    }
  }
}
/*
 * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
 * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
 */

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}


// haha, https://github.com/features/copilot
const memoize = fn => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return (cache[key] = cache[key] || fn(...args));
  };
}

const memoizedBase64Decode = memoize(b64DecodeUnicode);

class HoverStack {
  constructor() {
    this.list = [];
  }

  dismiss(hover) {
    if (hover) {
      hover.remove();
      this.list = this.list.filter(x => x !== hover);
    }
  }

  dismissIfNotUsed(hover) {
    // When mouse leaves the error part of the code, we check the following thing after 1 second:
    // (1) If the mouse is inside the tooltip popup, we do nothing.
    // (2) If the tooltip popup is clicked, we do nothing.
    // Otherwise, close the tooltip popup.
    if (hover) {
      hover.markedForDismissal = true;
      setTimeout(() => {
        // If the current hover is still the same as the locked hover...
        if (!hover.userIsThinking && this.allowAutoDismissal(hover))
          this.dismiss(hover)
      }, 1000);
    }
  }

  allowAutoDismissal(hover) {
    // Clicking on a tooltip anchors the tooltip on the page.
    // Anchored tooltips can only be dismissed by clicking the close button manually.
    // This is useful when I want to inspect a long error with the code.
    return hover.markedForDismissal && !hover.userClicked;
  }

  fireAutoDismissalFor(link) {
    let hover = this.list.find(hover => hover.userCreatedFrom === link);
    this.dismissIfNotUsed(hover);
  }

  /* Initial implementation comes from https://github.com/plt-amy/1lab/blob/5e5a22abce8a5cfb62b5f815e1231c1e34bb0a12/support/web/js/highlight-hover.ts#L22 */
  /* Slightly modified to show multiple tooltips at a time. */
  createHoverFor(link, text, container) {
    // if the tooltip for the error code is already shown, and user once clicked it,
    // do not recreate it again, because `userClicked` may be lost, allowing the tooltip to be
    // dismissed after a certain time.
    let old = this.list.find(hover => hover.userCreatedFrom === link);
    if (old) {
      if (old.userClicked) return old;
    }
    // Find all links that overlap with the current link
    let dismissNow = [];
    const nested = this.list.filter(hover => {
      // The tooltip is marked as auto dismissal,
      // and the user is not hovering over it
      // ----- dismiss now as we need to draw new tooltip.
      if (this.allowAutoDismissal(hover)) {
        dismissNow.push(hover);
        return false;
      }
      const hoverLink = hover.userCreatedFrom;
      const currentLink = link;
      // find if the two links have super common parent node
      let parent = currentLink;
      while (parent) {
        if (parent === hoverLink) return true;
        parent = parent.parentElement;
      }
      parent = hoverLink;
      while (parent) {
        if (parent === currentLink) return true;
        parent = parent.parentElement;
      }
      return false;
    });

    // elements in `dismissNow` may be dismissed by its `setTimeout`,
    // but if not, we give it a little help.
    dismissNow.forEach(x => this.dismiss(x));

    // this is a new tooltip, create it
    let newHover = document.createElement("div");
    newHover.userCreatedFrom = link;
    // set the content from base64 encoded attribute data-tooltip-text
    newHover.innerHTML = "<span id='AyaTooltipPopupClose'>&times;</span>" + memoizedBase64Decode(text);
    newHover.classList.add("AyaTooltipPopup");
    // Hover to highlight occurrences is done by adding mouse event listeners to the elements in the tooltip.
    // The inserted tooltip is not a child of `document` when the page was loaded, so a manual setup is needed.
    highlightFn(newHover);

    // Auto-dismissal setup
    let self = this;
    newHover.handleEvent = function (event) {
      if (event.type === 'click') {
        // Clicking on a tooltip disables the auto-dismissal.
        this.userClicked = true;
        this.markedForDismissal = false;
        // The close button must be the first child
        let close = this.children[0];
        if (!close) return; // already closed
        let closeThis = this;
        close.style.visibility = "visible";
        close.addEventListener("click", _ => self.dismiss(closeThis));
      }
      if (event.type === 'mouseover') {
        this.userIsThinking = true;
      }
      if (event.type === 'mouseout') {
        this.userIsThinking = false;
        self.dismissIfNotUsed(this);
      }
    }
    newHover.addEventListener("click", newHover);
    newHover.addEventListener("mouseover", newHover);
    newHover.addEventListener("mouseout", newHover);

    // add to the container, so `getBoundingClientRect()` returns something.
    container.appendChild(newHover);

    // calculate the position of the tooltip
    newHover.style.left = `${link.offsetLeft}px`;
    if (nested.length === 0) {
      const selfRect = link.getBoundingClientRect();
      const hoverRect = newHover.getBoundingClientRect();
      // If we're close to the bottom of the page, push the tooltip above instead.
      // The constant here is arbitrary, because trying to convert em to px in JS is a fool's errand.
      if (selfRect.bottom + hoverRect.height + 30 > window.innerHeight) {
        // 3em for showing above the type hover
        newHover.style.top = `calc(${link.offsetTop - hoverRect.height + 8}px - 3em)`;
      } else {
        newHover.style.top = `${link.offsetTop + link.offsetHeight + 8}px`;
      }
    } else {
      // If there are other tooltips, put this one below the last one.
      const belowest = Math.max(...nested.map(hover => hover.offsetTop + hover.offsetHeight));
      newHover.style.top = `${belowest + 8}px`;
      // TODO: if we're close to the bottom?
    }

    // THE BIG GAME!
    this.list.push(newHover);
    return newHover;
  }
}

let hoverStack = new HoverStack();

function showTooltip(on) {
  return function () {
    let link = this;
    const text = link.getAttribute("data-tooltip-text");
    if (!text) return;
    if (on) {
      hoverStack.createHoverFor(link, text, document.body);
    } else {
      // When mouse leaves error code part, fire an auto-dismissal.
      hoverStack.fireAutoDismissalFor(link);
    }
  }
}{
  /*
   * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
   * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
   */
  
  highlightFn(document);

}
{
  /*
   * Copyright (c) 2020-2023 Tesla (Yinsen) Zhang.
   * Use of this source code is governed by the MIT license that can be found in the LICENSE.md file.
   */
  
  let links = document.getElementsByClassName('aya-tooltip');
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (!link.hasAttribute("data-tooltip-text")) continue;
    link.onmouseover = showTooltip(true);
    link.onmouseout = showTooltip(false);
  }

}
  }
}
</script>
