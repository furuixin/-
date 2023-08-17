const req1= require.context('./', false, /\.html$/)
console.log(req1,99)
const requireAll1 = requireContext => requireContext.keys().map(requireContext)
console.log(requireAll1)
requireAll1(req1)

