#include<bits/stdc++.h>
using namespace std;
#define int long long
constexpr int INF=3e18;
signed main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n,m; cin>>n>>m;
  int g[n][m]; for(int i=0;i<n;++i) for(int j=0;j<m;++j)
    cin>>g[i][j];
  int resr[n][m],resc[n][m];
  for(auto&v:resr) for(auto&x:v) x=-INF;
  for(auto&v:resc) for(auto&x:v) x=-INF;
  for(int i=0;i<n;++i) for(int j=0,run=0;j<m;++j)
    run=max(run+g[i][j],g[i][j]),resr[i][j]=max(resr[i][j],run);
  for(int i=0;i<n;++i) for(int j=m-1,run=0;j>=0;--j)
    run=max(run+g[i][j],g[i][j]),resr[i][j]=max(resr[i][j],run);
  for(int j=0;j<m;++j) for(int i=0,run=0;i<n;++i)
    run=max(run+g[i][j],g[i][j]),resc[i][j]=max(resc[i][j],run);
  for(int j=0;j<m;++j) for(int i=n-1,run=0;i>=0;--i)
    run=max(run+g[i][j],g[i][j]),resc[i][j]=max(resc[i][j],run);
  int ans=-INF;
  for(int i=0;i<n;++i) for(int j=0;j<m;++j)
    ans=max(ans,resr[i][j]+resc[i][j]-g[i][j]);
  cout<<ans<<'\n';
  return 0;
}

