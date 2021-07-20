<template>
  <div class="__character_portrait__" :class="alignment_class">
      <div class="player-char-portrait char-portrait-full char-portrait-full-gear-t8 char-portrait-full-alignment-light-side">
        <a href="/p/979863726/characters/jawa" class="char-portrait-full-link" rel="nofollow">
          <img class="char-portrait-full-img loading" src="http://swgoh.gg/game-asset/u/JAWA.png" alt="Jawa" height="80" width="80" data-was-processed="true">
          <div class="char-portrait-full-gear"></div>
          <div class="star star1"></div>
          <div class="star star2"></div>
          <div class="star star3"></div>
          <div class="star star4"></div>
          <div class="star star5"></div>
          <div class="star star6 star-inactive"></div>
          <div class="star star7 star-inactive"></div>
        </a>
      </div>
      <div class="collection-char-gp" data-toggle="tooltip" data-container="body" title="" data-original-title="Power 6,115 / 28,644">
        <div class="collection-char-gp-progress">
          <div class="collection-char-gp-progress-bar" style="width: 21.3483%;"></div>
        </div>
        <div class="collection-char-gp-label">
          <span class="collection-char-gp-label-value">21</span>
          <span class="collection-char-gp-label-percent">%</span>
        </div>
      </div>
      <div class="collection-char-name">
        <a class="collection-char-name-link" href="/p/979863726/characters/jawa" rel="nofollow">
          Jawa
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: "Character_Portrait",
  computed: {
    alignment_class: 'light_side'
  }
}
</script>

<style lang="scss">
.__character_portrait__ {

}
</style>
