# Some elaboration rules

This is just a collection of elaboration rules that are used in Aya.
This is not a blog post, but a reference for developers and type theory implementers.


Content below assumes knowledge on cubical type theory, for example the extension type and higher inductive types.

## Syntax
+ $\[\\overline i\] X{\\overline{\\phi\\mapsto u}}$: extension types, `PathP A a b` in Agda corresponds to $\[i\] A\~i{i=0\\mapsto a, i=1\\mapsto b}$.

## Flattening

Used in higher inductive type elaboration.


$$
\\newcommand{\\Gvdash}{\\Gamma\\vdash}
\\newcommand{\\flattenOp}\[1\]{\\textsf{flatten}\(\#1\)}
\\cfrac{A \\ne \[\\overline i\] X{\\cdots}}{\\flattenOp{A} := A}
$$


$$
\\cfrac
{\\flattenOp{X}:=\[\\overline j\] Y{\\overline{\\phi'\\mapsto u'}}}
{\\flattenOp{\[\\overline i\] X{\\overline{\\phi\\mapsto u}}}
:=
\[\\overline i,\\overline j\] Y{\\overline{\\phi'\\mapsto u'\~@\~\\overline j},\\overline{\\phi\\mapsto u}}}
$$


Example:

<pre class="Aya">
<code><span class="Keyword">prim</span> <a id="Mian-I" class="aya-hover" aya-type="ISet" href="#Mian-I"><span class="Primitive">I</span></a> <span class="Keyword">prim</span> <a id="Mian-coe" class="aya-hover" aya-type="Π (A : I → Type 0) I (A 0) → A 1" href="#Mian-coe"><span class="Primitive">coe</span></a> <span class="Keyword">prim</span> <a id="Mian-coeFill" class="aya-hover" aya-type="Π (A : I → Type 0) (phi : I) (u : A 0) → u = coe A phi u" href="#Mian-coeFill"><span class="Primitive">coeFill</span></a>
<span class="Keyword">prim</span> <a id="Mian-intervalInv" class="aya-hover" aya-type="I → I" href="#Mian-intervalInv"><span class="Primitive">intervalInv</span></a>
<span class="Keyword">def</span> <span class="Keyword">inline</span> <a id="Mian-7e" class="aya-hover" aya-type="I → I" href="#Mian-7e"><span class="Fn">~</span></a> =&gt; <a class="aya-hover" aya-type="I → I" href="#Mian-intervalInv"><span class="Primitive">intervalInv</span></a>
<span class="Keyword">variable</span> <a id="v2073707154" href="#v2073707154"><span class="Generalized">A</span></a> <a id="v811301908" href="#v811301908"><span class="Generalized">B</span></a> : <span class="Keyword">Type</span>
<span class="Keyword">def</span> <span class="Keyword">infix</span> <a id="Mian-3d" class="aya-hover" aya-type="Π {A : Type 0} (a b : A) → Type 0" href="#Mian-3d"><span class="Fn">=</span></a> (<a id="v1052195003" class="aya-hover" aya-type="A" href="#v1052195003">a</a> <a id="v1541049864" class="aya-hover" aya-type="A" href="#v1541049864">b</a> : <a class="aya-hover" aya-type="Type 0" href="#v2073707154"><span class="Generalized">A</span></a>) =&gt; [| <a id="v989892772" class="aya-hover" aya-type="I" href="#v989892772">i</a> |] <a class="aya-hover" aya-type="Type 0" href="#v2073707154"><span class="Generalized">A</span></a> { <a class="aya-hover" aya-type="I" href="#v989892772">i</a> := <a class="aya-hover" aya-type="A" href="#v1541049864">b</a> | <a class="aya-hover" aya-type="I → I" href="#Mian-7e"><span class="Fn">~</span></a> <a class="aya-hover" aya-type="I" href="#v989892772">i</a> := <a class="aya-hover" aya-type="A" href="#v1052195003">a</a> }
<span class="Keyword">def</span> <a id="Mian-refl" class="aya-hover" aya-type="Π {A : Type 0} {a : A} → a = a" href="#Mian-refl"><span class="Fn">refl</span></a> {<a id="v16503286" class="aya-hover" aya-type="A" href="#v16503286">a</a> : <a class="aya-hover" aya-type="Type 0" href="#v2073707154"><span class="Generalized">A</span></a>} : <a class="aya-hover" aya-type="A" href="#v16503286">a</a> <a class="aya-hover" aya-type="A → A → Type 0" href="#Mian-3d"><span class="Fn">=</span></a> <a class="aya-hover" aya-type="A" href="#v16503286">a</a> =&gt; <span class="Keyword">λ</span> <a id="v593687897" class="aya-hover" aya-type="I" href="#v593687897">i</a> =&gt; <a class="aya-hover" aya-type="A" href="#v16503286">a</a></code>
</pre>
<style>
.Aya a { text-decoration: none; color: black; }
.Aya a[href]:hover { background-color: #B4EEB4; }
.Aya [href].hover-highlight { background-color: #B4EEB4; }
</style>
<style>
.Aya .aya-hover {
  /* make absolute position available for hover popup */
  position: relative;
  cursor: pointer;
}
.Aya [aya-type]:after {
  /* hover text */
  content: attr(aya-type);
  visibility: hidden;
  /* above the text, aligned to left */
  position: absolute;
  top: 0;
  left: 0; /* 0% for left-aligned, 100% for right-aligned*/
  transform: translate(0px, -110%);
  /* spacing */
  white-space: pre;
  padding: 5px 10px;
  background-color: rgba(18,26,44,0.8);
  color: #fff;
  box-shadow: 1px 1px 14px rgba(0,0,0,0.1)
}
.Aya .aya-hover:hover:after {
  /* show on hover */
  transform: translate(0px, -110%);
  visibility: visible;
  display: block;
}
</style>
<script>
export default {
  mounted() {
var highlight = function (on) {
  return function () {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      var that = links[i];
      if (this.href !== that.href) continue;
      if (on) that.classList.add("hover-highlight");
      else that.classList.remove("hover-highlight");
    }
  }
};
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  var link = links[i];
  if (!link.hasAttribute("href")) continue;
  link.onmouseover = highlight(true);
  link.onmouseout = highlight(false);
}
  }
}
</script>
