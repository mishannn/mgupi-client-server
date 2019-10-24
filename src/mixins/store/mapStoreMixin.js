import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('map', ['points']),
  },
  methods: {
    ...mapActions('map', ['loadPoints', 'addPoint', 'deletePoint']),
    ...mapMutations('map', ['setPoints']),
  },
};
