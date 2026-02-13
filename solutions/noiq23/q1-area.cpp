#include<bits/stdc++.h>
using namespace std;
#define int long long
signed main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  int h[n],w[n]; for(int i=0;i<n;++i){
    cin>>h[i]>>w[i];
  }
  int res=0;
  for(int i=0;i<n;++i){
    res=max(res,h[i]*w[i]);
  }
  cout<<res<<'\n';
  return 0;
}

