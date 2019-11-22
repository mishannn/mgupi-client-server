import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['jwtToken']),
  },
  methods: {
    ...mapActions('auth', ['signUp', 'signIn', 'signOut', 'restoreSession']),
    ...mapMutations('auth', ['setJwtToken']),
  },
};
