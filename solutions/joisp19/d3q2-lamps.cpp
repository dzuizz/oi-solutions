#include<bits/stdc++.h>
using namespace std;
#define int long long
signed main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  string a,b; cin>>a>>b;
  int dp[8]; memset(dp,0x3f,sizeof dp);
  dp[0]=0;
  for(int i=0;i<n;++i){
    int ca=a[i]=='1',cb=b[i]=='1';
    int nx[6]; memset(nx,0x3f,sizeof nx);
    if(ca==cb) nx[0]=min({dp[0],dp[1],dp[2],dp[3],dp[4],dp[5]});
    if(cb==0) nx[1]=min({1+min({dp[0],dp[2],dp[3],dp[5]}),dp[1],dp[4]});
    if(cb==1) nx[2]=min({1+min({dp[0],dp[1],dp[3],dp[4]}),dp[2],dp[5]});
    if(ca!=cb) nx[3]=min({1+min({dp[0],dp[1],dp[2]}),dp[3],dp[4],dp[5]});
    if(cb==1) nx[4]=min({1+min({1+dp[0],dp[1],1+dp[2],dp[3],dp[5]}),dp[4]});
    if(cb==0) nx[5]=min({1+min({1+dp[0],1+dp[1],dp[2],dp[3],dp[4]}),dp[5]});
    for(int j=0;j<8;++j) dp[j]=nx[j];
  }
  cout<<*min_element(dp,dp+6)<<'\n';
  return 0;
}

