
import { Colors } from "@/constants";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Brand = ({ color = Colors.colorBrand.burntSienna[600], size = 25, outline = "#7C87FF" }) => (
	<Svg
		fill="none"
		viewBox="0 0 255 255"
		width={size}
		height={size}
	>
		<Path
			fill={color}
			d="M132.6 22.631c2.034 1.822 2.822 3.802 3.575 6.377l.358 1.166c.399 1.308.783 2.62 1.167 3.932l.424 1.44c.938 3.188 1.857 6.382 2.771 9.577q1.257 4.386 2.524 8.768l.252.876c1.39 4.813 2.794 9.621 4.236 14.419l.608 2.033c1.004 3.362 2.066 6.693 3.26 9.993l.306.847c1.585 4.302 3.419 8.403 6.338 11.972l.416.594c9.419 12.725 37.937 15.76 52.267 19.859a1977 1977 0 0 1 12.191 3.531q.912.269 1.826.533c3.22.958 5.988 1.879 7.887 4.808 1.046 2.37 1.324 4.552.439 7.013-1.352 3.082-3.097 4.202-6.176 5.419-1.617.549-3.251 1.031-4.89 1.507l-1.413.418q-1.87.551-3.743 1.096-1.555.455-3.11.913c-5.414 1.592-10.834 3.163-16.28 4.644-4.311 1.174-8.585 2.467-12.858 3.773l-1.007.307c-7.522 2.265-7.522 2.265-14.811 5.172l-.72.325c-8.47 3.891-12.895 9.793-16.154 18.322-3.714 10.088-6.489 20.527-9.447 30.855a1596 1596 0 0 1-5.073 17.386 654 654 0 0 1-2.023 6.682l-.327 1.03-.27.85c-.83 1.999-2.407 3.502-4.383 4.357-2.541.784-4.994.74-7.404-.419-3.661-2.339-4.35-6.636-5.518-10.558l-.524-1.745c-1.739-5.805-3.419-11.628-5.109-17.448-5.195-22.611-5.195-22.611-15.942-42.605l-.608-.797c-8.122-9.698-27.275-12.309-38.839-15.578a2117 2117 0 0 1-11.863-3.408l-2.565-.741c-4.253-1.226-8.5-2.469-12.723-3.796l-.984-.303c-2.73-.87-5.112-1.872-6.687-4.383-1.195-2.794-1.262-5.231-.137-8.06 1.223-2.322 3.038-3.404 5.489-4.186l.63-.203c2.407-.768 4.832-1.479 7.257-2.186l1.489-.436q1.963-.575 3.928-1.149l3.26-.953a3428 3428 0 0 1 16.043-4.663c22.86-5.33 22.86-5.33 39.615-20.137 6.395-11.714 9.157-25.792 12.81-38.552 1.67-5.833 3.349-11.662 5.101-17.47l.249-.832c2.671-8.896 2.671-8.896 5.306-10.594 3.077-1.623 6.666-1.621 9.566.408m-5.419 36.02-.194.666c-13.188 45.287-13.188 45.287-29.19 54.457-12.097 6.64-26.265 9.76-39.466 13.407.257.69.257.69.92.879l.801.23.908.265.997.282 1.035.301q1.653.479 3.308.952a2135 2135 0 0 1 5.36 1.55c3.477 1.015 6.925 2.116 10.369 3.236q1.57.507 3.143 1.002c12.759 4.087 23.227 10.832 29.508 22.933 1.525 3.07 2.732 6.268 3.895 9.489l.349.964c3.168 8.886 5.639 18.027 8.257 27.086h.638l.166-.568c13.305-45.541 13.305-45.541 29.378-54.615 10.321-5.634 22.164-8.49 33.399-11.701q.801-.229 1.602-.461.847-.244 1.698-.478l.878-.249.796-.221c.676-.183.676-.183.933-.876l-1.002-.28c-26.213-7.353-26.213-7.353-33.742-10.876l-.687-.315c-5.127-2.37-9.687-5.207-13.657-9.247l-.711-.713c-3.28-3.483-5.597-7.718-7.576-12.037l-.301-.646c-5.023-10.907-7.853-22.91-11.174-34.417z"
		></Path>
		<Path
			fill={outline}
			d="M102 28.688c1.937 1.309 3.282 2.792 3.825 5.1.283 2.568.316 4.896-1.275 7.012-1.893 2.087-4.066 2.95-6.674 3.885q-1.2.45-2.395.909l-.61.233c-9.113 3.527-17.424 8.61-24.746 15.054l-.754.648a43 43 0 0 0-2.872 2.68c-.837.816-.837.816-1.474.816l-.228.547c-.503.895-1.12 1.475-1.864 2.182-8.542 8.409-14.797 19.836-18.606 31.102-.83 2.387-1.93 4.706-4.224 5.993l-.632.367c-1.967.978-4.409.909-6.515.414-2.104-.824-3.518-2.3-4.618-4.25-1.18-2.71-.664-5.479.29-8.165l.297-.86c6.52-18.351 18.617-35.579 34.258-47.302.597-.45 1.187-.91 1.776-1.37 3.07-2.376 6.27-4.444 9.629-6.39l.725-.42c5.275-3.043 10.666-5.512 16.388-7.597q.952-.35 1.9-.713c2.86-1.044 5.648-1.427 8.399.125M161.865 28.668l.87.302c5.372 1.904 10.461 4.298 15.446 7.049l.619.337c11.58 6.332 22.653 15.574 30.619 26.119l1.092 1.41c2.644 3.438 5.035 6.942 7.195 10.702l.417.72c3.044 5.277 5.515 10.669 7.601 16.392q.352.959.713 1.913c.975 2.695 1.25 4.959.225 7.686-1.007 2.021-2.506 3.521-4.626 4.326-2.65.646-5.002.421-7.416-.826-1.91-1.465-2.929-3.144-3.707-5.388l-.57-1.533-.298-.803c-2.762-7.299-6.291-14.22-10.826-20.574l-.385-.543c-2.495-3.504-5.29-6.89-8.436-9.831-.423-.464-.423-.464-.423-1.101l-.55-.23c-.878-.494-1.431-1.087-2.12-1.822-1.932-1.97-4.055-3.62-6.255-5.28l-.59-.45c-2.874-2.19-5.815-4.166-8.972-5.924l-.797-.445c-4.97-2.745-10.088-4.904-15.395-6.904-2.398-.923-4.268-2.06-5.643-4.306-.985-2.26-.874-5.172 0-7.45 1.004-1.899 2.62-3.29 4.582-4.144 2.647-.795 5.088-.312 7.63.598M40.461 150.202c1.806 1.556 2.85 3.149 3.626 5.388l.57 1.532.298.803c4.258 11.254 10.515 22.085 19.193 30.536l.877.876v.638l.547.228c.895.503 1.475 1.119 2.182 1.864 4.402 4.472 9.728 8.12 15.121 11.295l.858.538c3.82 2.348 7.99 4.155 12.186 5.715l1.118.416q1.071.394 2.148.77c2.597.947 4.638 2.173 6.162 4.534.985 2.26.874 5.173 0 7.451-1.181 2.225-3.036 3.58-5.398 4.352-2.458.393-4.468.019-6.794-.806l-.875-.302c-5.38-1.898-10.471-4.296-15.461-7.049l-.619-.337c-11.58-6.333-22.653-15.574-30.619-26.119l-1.092-1.41c-2.644-3.438-5.035-6.942-7.195-10.703l-.417-.719c-3.044-5.277-5.515-10.669-7.601-16.392q-.352-.958-.713-1.913c-1.08-2.984-1.184-5.217-.001-8.201.94-1.745 2.66-3.188 4.533-3.871 2.584-.526 5.078-.484 7.366.886M223.724 150.277c1.96 1.426 3.133 3.184 3.545 5.592.181 2.136-.191 3.889-.897 5.897l-.297.864c-6.405 18.113-18.314 35.003-33.55 46.789l-.678.529c-3.671 2.851-7.408 5.439-11.434 7.758l-.694.407c-17.649 10.318-17.649 10.318-24.581 9.019-2.19-.611-3.82-1.82-5.13-3.677-1.199-2.26-1.264-5.028-.634-7.479 1.049-2.406 3.178-3.907 5.547-4.857q1.1-.408 2.203-.804 1.197-.448 2.392-.906l.609-.233c3.352-1.298 6.57-2.903 9.769-4.538l.673-.344c5.188-2.699 9.947-6.3 14.308-10.175l.751-.645c1-.86 1.956-1.735 2.875-2.682.837-.817.837-.817 1.474-.817l.238-.556c.464-.834 1.001-1.359 1.694-2.014 1.624-1.592 3.044-3.289 4.443-5.08l.442-.561c6.009-7.666 10.423-16.227 13.766-25.352 1.05-2.82 2.151-5.129 4.778-6.759 2.696-1.167 5.893-.838 8.388.624"
		></Path>
	</Svg>
);
