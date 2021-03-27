<div class="container">
  <div class="container-mask"></div>
  <div class="title">
    <img class="title-img" src="/static/img/logo.svg">
    Aya Prover
  </div>
</div>

<div class="spacer"></div>

<style>

.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-image: url('/static/img/background.jpg'); */
  background-size: cover;
  text-align: center;
  padding: 0;
}

.container-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #0005;
}

.title {
  font-size: 50px;
  font-weight: lighter;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0 50px;
}

.title-img {
  vertical-align: -30%;
  width: 75px;
  height: 75px;
}

.spacer {
  position: relative;
  top: 0;
  left: 0;
  height: 105vh;
}
</style>

# The Aya Prover

Aya is a programming language and a proof assistant designed for formalizing math _and_ type-directed programming.

The type system of Aya features in homotopical features similar to [Arend],
overlapping but confluent pattern matching, and abstraction over definitional equalities.

Aya is under active development. Please be patient until future information is available.

 [Arend]: https://arend-lang.github.io
