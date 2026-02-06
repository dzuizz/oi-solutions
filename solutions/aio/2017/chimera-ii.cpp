// https://orac2.info/problem/308/
#include<bits/stdc++.h>
using namespace std;
constexpr int INF=2e9;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  string s[2],t; cin>>s[0]>>s[1]>>t;
  bool f[n][2]; for(int i=0;i<n;++i) for(int j:{0,1})
    f[i][j]=(s[j][i]==t[i]);
  int dp[n][2];
  dp[0][0]=(f[0][0]?0:INF),dp[0][1]=(f[0][1]?0:INF);
  for(int i=1;i<n;++i){
    dp[i][0]=(f[i][0]?min(dp[i-1][0],dp[i-1][1]+1):INF);
    dp[i][1]=(f[i][1]?min(dp[i-1][0]+1,dp[i-1][1]):INF);
  }
  int k=min(dp[n-1][0],dp[n-1][1]);
  if(k==INF) cout<<"PLAN FOILED\n";
  else cout<<"SUCCESS\n"<<k<<'\n';
  return 0;
}

